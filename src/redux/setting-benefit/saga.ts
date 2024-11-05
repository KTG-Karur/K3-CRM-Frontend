// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSettingBenefit, getSettingBenefit, updateSettingBenefit } from '../../api/SettingBenefitApi'; // Adjust the path as needed
import {
  getSettingBenefitSuccess, getSettingBenefitFailure,
  createSettingBenefitSuccess,
  createSettingBenefitFailure,
  updateSettingBenefitSuccess,
  updateSettingBenefitFailure,
} from './actions';

// Saga to handle fetching settingBenefits
function* fetchSettingBenefitSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSettingBenefit, action.payload);
    yield put(getSettingBenefitSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getSettingBenefitFailure(errorMessage));
  }
}

// // Saga to handle creating a settingBenefit
function* createSettingBenefitSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSettingBenefit, action.payload);
    yield put(createSettingBenefitSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createSettingBenefitFailure(errorMessage));
  }
}

// // Saga to handle updating a settingBenefit
function* updateSettingBenefitSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSettingBenefit, action.payload.data, action.payload.id);
    yield put(updateSettingBenefitSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateSettingBenefitFailure(errorMessage));
  }
}

// // Saga to handle updating a settingBenefit
// function* deleteSettingBenefitSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSettingBenefit, action.payload.id);
//     yield put(deleteSettingBenefitSuccess(data));
//   } catch (error: any) {
//     yield put(deleteSettingBenefitFailure(error.message));
//   }
// }

export default function* settingBenefitSaga() {
  yield takeEvery('GET_SETTING_BENEFIT_REQUEST', fetchSettingBenefitSaga);
  yield takeEvery('CREATE_SETTING_BENEFIT_REQUEST', createSettingBenefitSaga);
  yield takeEvery('UPDATE_SETTING_BENEFIT_REQUEST', updateSettingBenefitSaga);
  // yield takeEvery('DELETE_SETTING_BENEFIT_REQUEST', deleteSettingBenefitSaga);
}
