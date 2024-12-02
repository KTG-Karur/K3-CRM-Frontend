// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSettingWorkingDay, getSettingWorkingDay, updateSettingWorkingDay } from '../../api/SettingWorkingDayApi'; // Adjust the path as needed
import {
  getSettingWorkingDaySuccess, getSettingWorkingDayFailure,
  createSettingWorkingDaySuccess,
  createSettingWorkingDayFailure,
  updateSettingWorkingDaySuccess,
  updateSettingWorkingDayFailure,
} from './actions';

// Saga to handle fetching settingWorkingDays
function* fetchSettingWorkingDaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSettingWorkingDay, action.payload);
    yield put(getSettingWorkingDaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getSettingWorkingDayFailure(errorMessage));
  }
}

// // Saga to handle creating a settingWorkingDay
function* createSettingWorkingDaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSettingWorkingDay, action.payload);
    yield put(createSettingWorkingDaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createSettingWorkingDayFailure(errorMessage));
  }
}

// // Saga to handle updating a settingWorkingDay
function* updateSettingWorkingDaySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSettingWorkingDay, action.payload.data, action.payload.id);
    yield put(updateSettingWorkingDaySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateSettingWorkingDayFailure(errorMessage));
  }
}

// // Saga to handle updating a settingWorkingDay
// function* deleteSettingWorkingDaySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSettingWorkingDay, action.payload.id);
//     yield put(deleteSettingWorkingDaySuccess(data));
//   } catch (error: any) {
//     yield put(deleteSettingWorkingDayFailure(error.message));
//   }
// }

export default function* settingWorkingDaySaga() {
  yield takeEvery('GET_SETTING_WORKING_DAY_REQUEST', fetchSettingWorkingDaySaga);
  yield takeEvery('CREATE_SETTING_WORKING_DAY_REQUEST', createSettingWorkingDaySaga);
  yield takeEvery('UPDATE_SETTING_WORKING_DAY_REQUEST', updateSettingWorkingDaySaga);
  // yield takeEvery('DELETE_SETTING_WORKING_DAY_REQUEST', deleteSettingWorkingDaySaga);
}
