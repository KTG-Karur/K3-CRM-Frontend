// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createTransferStaff, getTransferStaff, updateTransferStaff } from '../../api/TransferStaffApi'; // Adjust the path as needed
import {
  getTransferStaffSuccess, getTransferStaffFailure,
  createTransferStaffSuccess,
  createTransferStaffFailure,
  updateTransferStaffSuccess,
  updateTransferStaffFailure,
} from './actions';

// Saga to handle fetching transferStaffs
function* fetchTransferStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getTransferStaff, action.payload);
    yield put(getTransferStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getTransferStaffFailure(errorMessage));
  }
}

// // Saga to handle creating a transferStaff
function* createTransferStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createTransferStaff, action.payload);
    yield put(createTransferStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createTransferStaffFailure(errorMessage));
  }
}

// // Saga to handle updating a transferStaff
function* updateTransferStaffSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateTransferStaff, action.payload.data, action.payload.id);
    yield put(updateTransferStaffSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateTransferStaffFailure(errorMessage));
  }
}

// // Saga to handle updating a transferStaff
// function* deleteTransferStaffSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteTransferStaff, action.payload.id);
//     yield put(deleteTransferStaffSuccess(data));
//   } catch (error: any) {
//     yield put(deleteTransferStaffFailure(error.message));
//   }
// }

export default function* transferStaffSaga() {
  yield takeEvery('GET_TRANSFER_STAFF_REQUEST', fetchTransferStaffSaga);
  yield takeEvery('CREATE_TRANSFER_STAFF_REQUEST', createTransferStaffSaga);
  yield takeEvery('UPDATE_TRANSFER_STAFF_REQUEST', updateTransferStaffSaga);
  // yield takeEvery('DELETE_TRANSFER_STAFF_REQUEST', deleteTransferStaffSaga);
}
