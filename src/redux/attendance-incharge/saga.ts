// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAttendanceIncharge, getAttendanceIncharge, updateAttendanceIncharge } from '../../api/AttendanceInchargeApi'; // Adjust the path as needed
import {
  getAttendanceInchargeSuccess, getAttendanceInchargeFailure,
  createAttendanceInchargeSuccess,
  createAttendanceInchargeFailure,
  updateAttendanceInchargeSuccess,
  updateAttendanceInchargeFailure,
} from './actions';

// Saga to handle fetching attendanceIncharges
function* fetchAttendanceInchargeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getAttendanceIncharge, action.payload);
    yield put(getAttendanceInchargeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getAttendanceInchargeFailure(errorMessage));
  }
}

// // Saga to handle creating a attendanceIncharge
function* createAttendanceInchargeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createAttendanceIncharge, action.payload);
    yield put(createAttendanceInchargeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createAttendanceInchargeFailure(errorMessage));
  }
}

// // Saga to handle updating a attendanceIncharge
function* updateAttendanceInchargeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateAttendanceIncharge, action.payload.data, action.payload.id);
    yield put(updateAttendanceInchargeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateAttendanceInchargeFailure(errorMessage));
  }
}

// // Saga to handle updating a attendanceIncharge
// function* deleteAttendanceInchargeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteAttendanceIncharge, action.payload.id);
//     yield put(deleteAttendanceInchargeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteAttendanceInchargeFailure(error.message));
//   }
// }

export default function* attendanceInchargeSaga() {
  yield takeEvery('GET_ATTENDANCE_INCHARGE_REQUEST', fetchAttendanceInchargeSaga);
  yield takeEvery('CREATE_ATTENDANCE_INCHARGE_REQUEST', createAttendanceInchargeSaga);
  yield takeEvery('UPDATE_ATTENDANCE_INCHARGE_REQUEST', updateAttendanceInchargeSaga);
  // yield takeEvery('DELETE_ATTENDANCE_INCHARGE_REQUEST', deleteAttendanceInchargeSaga);
}
