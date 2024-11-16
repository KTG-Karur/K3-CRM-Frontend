// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSettingLeaveDeduction, getSettingLeaveDeduction, updateSettingLeaveDeduction } from '../../api/SettingLeaveDeductionApi'; // Adjust the path as needed
import {
  getSettingLeaveDeductionSuccess, getSettingLeaveDeductionFailure,
  createSettingLeaveDeductionSuccess,
  createSettingLeaveDeductionFailure,
  updateSettingLeaveDeductionSuccess,
  updateSettingLeaveDeductionFailure,
} from './actions';

// Saga to handle fetching settingLeaveDeductions
function* fetchSettingLeaveDeductionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSettingLeaveDeduction, action.payload);
    yield put(getSettingLeaveDeductionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getSettingLeaveDeductionFailure(errorMessage));
  }
}

// // Saga to handle creating a settingLeaveDeduction
function* createSettingLeaveDeductionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSettingLeaveDeduction, action.payload);
    yield put(createSettingLeaveDeductionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createSettingLeaveDeductionFailure(errorMessage));
  }
}

// // Saga to handle updating a settingLeaveDeduction
function* updateSettingLeaveDeductionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSettingLeaveDeduction, action.payload.data, action.payload.id);
    yield put(updateSettingLeaveDeductionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateSettingLeaveDeductionFailure(errorMessage));
  }
}

// // Saga to handle updating a settingLeaveDeduction
// function* deleteSettingLeaveDeductionSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSettingLeaveDeduction, action.payload.id);
//     yield put(deleteSettingLeaveDeductionSuccess(data));
//   } catch (error: any) {
//     yield put(deleteSettingLeaveDeductionFailure(error.message));
//   }
// }

export default function* settingLeaveDeductionSaga() {
  yield takeEvery('GET_SETTING_LEAVE_DEDUCTION_REQUEST', fetchSettingLeaveDeductionSaga);
  yield takeEvery('CREATE_SETTING_LEAVE_DEDUCTION_REQUEST', createSettingLeaveDeductionSaga);
  yield takeEvery('UPDATE_SETTING_LEAVE_DEDUCTION_REQUEST', updateSettingLeaveDeductionSaga);
  // yield takeEvery('DELETE_SETTING_LEAVE_DEDUCTION_REQUEST', deleteSettingLeaveDeductionSaga);
}
