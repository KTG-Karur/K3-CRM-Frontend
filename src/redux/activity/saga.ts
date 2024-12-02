// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createActivity, getActivity, updateActivity } from '../../api/ActivityApi'; // Adjust the path as needed
import { 
  getActivitySuccess, getActivityFailure,
  createActivitySuccess,
  createActivityFailure,
  updateActivitySuccess,
  updateActivityFailure,
} from './actions';

// Saga to handle fetching activitys
function* fetchActivitySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getActivity, action.payload);
    yield put(getActivitySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getActivityFailure(errorMessage));
  }
}

// // Saga to handle creating a activity
function* createActivitySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createActivity, action.payload);
    yield put(createActivitySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createActivityFailure(errorMessage));
  }
}

// // Saga to handle updating a activity
function* updateActivitySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateActivity, action.payload.data, action.payload.id);
    yield put(updateActivitySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateActivityFailure(errorMessage));
  }
}

// // Saga to handle updating a activity
// function* deleteActivitySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteActivity, action.payload.id);
//     yield put(deleteActivitySuccess(data));
//   } catch (error: any) {
//     yield put(deleteActivityFailure(error.message));
//   }
// }

export default function* activitySaga() {
  yield takeEvery('GET_ACTIVITY_REQUEST', fetchActivitySaga);
  yield takeEvery('CREATE_ACTIVITY_REQUEST', createActivitySaga);
  yield takeEvery('UPDATE_ACTIVITY_REQUEST', updateActivitySaga);
  // yield takeEvery('DELETE_ACTIVITY_REQUEST', deleteActivitySaga);
}
