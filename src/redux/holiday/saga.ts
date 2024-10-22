// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createHoliday, getHoliday, updateHoliday } from '../../api/HolidayApi'; // Adjust the path as needed
import {
  getHolidaySuccess, getHolidayFailure,
  createHolidaySuccess,
  createHolidayFailure,
  updateHolidaySuccess,
  updateHolidayFailure,
} from './actions';

// Saga to handle fetching holidays
function* fetchHolidaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getHoliday, action.payload);
    yield put(getHolidaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getHolidayFailure(errorMessage));
  }
}

// // Saga to handle creating a holiday
function* createHolidaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createHoliday, action.payload);
    yield put(createHolidaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createHolidayFailure(errorMessage));
  }
}

// // Saga to handle updating a holiday
function* updateHolidaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateHoliday, action.payload.data, action.payload.id);
    yield put(updateHolidaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateHolidayFailure(errorMessage));
  }
}

// // Saga to handle updating a holiday
// function* deleteHolidaySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteHoliday, action.payload.id);
//     yield put(deleteHolidaySuccess(data));
//   } catch (error: any) {
//     yield put(deleteHolidayFailure(error.message));
//   }
// }

export default function* holidaySaga() {
  yield takeEvery('GET_HOLIDAY_REQUEST', fetchHolidaySaga);
  yield takeEvery('CREATE_HOLIDAY_REQUEST', createHolidaySaga);
  yield takeEvery('UPDATE_HOLIDAY_REQUEST', updateHolidaySaga);
  // yield takeEvery('DELETE_HOLIDAY_REQUEST', deleteHolidaySaga);
}
