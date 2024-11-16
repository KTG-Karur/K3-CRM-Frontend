// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDesignation, getDesignation, updateDesignation } from '../../api/DesignationApi'; // Adjust the path as needed
import {
  getDesignationSuccess, getDesignationFailure,
  createDesignationSuccess,
  createDesignationFailure,
  updateDesignationSuccess,
  updateDesignationFailure,
} from './actions';

// Saga to handle fetching designations
function* fetchDesignationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDesignation, action.payload);
    yield put(getDesignationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getDesignationFailure(errorMessage));
  }
}

// // Saga to handle creating a designation
function* createDesignationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDesignation, action.payload);
    yield put(createDesignationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createDesignationFailure(errorMessage));
  }
}

// // Saga to handle updating a designation
function* updateDesignationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDesignation, action.payload.data, action.payload.id);
    yield put(updateDesignationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateDesignationFailure(errorMessage));
  }
}

// // Saga to handle updating a designation
// function* deleteDesignationSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDesignation, action.payload.id);
//     yield put(deleteDesignationSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDesignationFailure(error.message));
//   }
// }

export default function* designationSaga() {
  yield takeEvery('GET_DESIGNATION_REQUEST', fetchDesignationSaga);
  yield takeEvery('CREATE_DESIGNATION_REQUEST', createDesignationSaga);
  yield takeEvery('UPDATE_DESIGNATION_REQUEST', updateDesignationSaga);
  // yield takeEvery('DELETE_DESIGNATION_REQUEST', deleteDesignationSaga);
}
