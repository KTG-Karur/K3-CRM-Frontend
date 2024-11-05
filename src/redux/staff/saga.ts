// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaff, getStaff, getStaffDetails, updateStaff } from '../../api/StaffApi'; // Adjust the path as needed
import {
  getStaffSuccess, getStaffFailure,
  createStaffSuccess,
  createStaffFailure,
  updateStaffSuccess,
  updateStaffFailure,
  getStaffDetailsSuccess,
  getStaffDetailsFailure,
} from './actions';

// Saga to handle fetching staffs
function* fetchStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaff, action.payload);
    yield put(getStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getStaffFailure(errorMessage));
  }
}

// Saga to handle fetching staffs
function* fetchStaffDetailsSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffDetails, action.payload);
    yield put(getStaffDetailsSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getStaffDetailsFailure(errorMessage));
  }
}

// // Saga to handle creating a staff
function* createStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaff, action.payload);
    yield put(createStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createStaffFailure(errorMessage));
  }
}

// // Saga to handle updating a staff
function* updateStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaff, action.payload.data, action.payload.id);
    yield put(updateStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateStaffFailure(errorMessage));
  }
}

// // Saga to handle updating a staff
// function* deleteStaffSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaff, action.payload.id);
//     yield put(deleteStaffSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffFailure(error.message));
//   }
// }

export default function* staffSaga() {
  yield takeEvery('GET_STAFF_REQUEST', fetchStaffSaga);
  yield takeEvery('GET_STAFF_DETAILS_REQUEST', fetchStaffDetailsSaga);
  yield takeEvery('CREATE_STAFF_REQUEST', createStaffSaga);
  yield takeEvery('UPDATE_STAFF_REQUEST', updateStaffSaga);
  // yield takeEvery('DELETE_STAFF_REQUEST', deleteStaffSaga);
}
