// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffRights, getStaffRights, updateStaffRights } from '../../api/StaffRightsApi'; // Adjust the path as needed
import {
  getStaffRightsSuccess, getStaffRightsFailure,
  createStaffRightsSuccess,
  createStaffRightsFailure,
  updateStaffRightsSuccess,
  updateStaffRightsFailure,
} from './actions';

// Saga to handle fetching staffRightsss
function* fetchStaffRightsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffRights, action.payload);
    yield put(getStaffRightsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getStaffRightsFailure(errorMessage));
  }
}

// // Saga to handle creating a staffRightss
function* createStaffRightsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffRights, action.payload);
    yield put(createStaffRightsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createStaffRightsFailure(errorMessage));
  }
}

// // Saga to handle updating a staffRightss
function* updateStaffRightsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffRights, action.payload.data, action.payload.id);
    yield put(updateStaffRightsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateStaffRightsFailure(errorMessage));
  }
}

// // Saga to handle updating a staffRightss
// function* deleteStaffRightsSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffRights, action.payload.id);
//     yield put(deleteStaffRightsSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffRightsFailure(error.message));
//   }
// }

export default function* staffRightsSaga() {
  yield takeEvery('GET_STAFF_RIGHTS_REQUEST', fetchStaffRightsSaga);
  yield takeEvery('CREATE_STAFF_RIGHTS_REQUEST', createStaffRightsSaga);
  yield takeEvery('UPDATE_STAFF_RIGHTS_REQUEST', updateStaffRightsSaga);
  // yield takeEvery('DELETE_STAFF_RIGHTS_REQUEST', deleteStaffRightsSaga);
}
