// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffLeave, getStaffLeave, updateStaffLeave } from '../../api/StaffLeaveApi'; // Adjust the path as needed
import {
  getStaffLeaveSuccess, getStaffLeaveFailure,
  createStaffLeaveSuccess,
  createStaffLeaveFailure,
  updateStaffLeaveSuccess,
  updateStaffLeaveFailure,
} from './actions';

// Saga to handle fetching staffLeaves
function* fetchStaffLeaveSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffLeave, action.payload);
    yield put(getStaffLeaveSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getStaffLeaveFailure(errorMessage));
  }
}

// // Saga to handle creating a staffLeave
function* createStaffLeaveSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffLeave, action.payload);
    yield put(createStaffLeaveSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createStaffLeaveFailure(errorMessage));
  }
}

// // Saga to handle updating a staffLeave
function* updateStaffLeaveSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffLeave, action.payload.data, action.payload.id);
    yield put(updateStaffLeaveSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateStaffLeaveFailure(errorMessage));
  }
}

// // Saga to handle updating a staffLeave
// function* deleteStaffLeaveSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffLeave, action.payload.id);
//     yield put(deleteStaffLeaveSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffLeaveFailure(error.message));
//   }
// }

export default function* staffLeaveSaga() {
  yield takeEvery('GET_STAFF_LEAVE_REQUEST', fetchStaffLeaveSaga);
  yield takeEvery('CREATE_STAFF_LEAVE_REQUEST', createStaffLeaveSaga);
  yield takeEvery('UPDATE_STAFF_LEAVE_REQUEST', updateStaffLeaveSaga);
  // yield takeEvery('DELETE_STAFF_LEAVE_REQUEST', deleteStaffLeaveSaga);
}
