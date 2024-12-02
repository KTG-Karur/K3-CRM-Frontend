// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSetting, getSetting, updateSetting } from '../../api/SettingApi'; // Adjust the path as needed
import { 
  getSettingSuccess, getSettingFailure,
  createSettingSuccess,
  createSettingFailure,
  updateSettingSuccess,
  updateSettingFailure,
} from './actions';

// Saga to handle fetching settings
function* fetchSettingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSetting, action.payload);
    yield put(getSettingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getSettingFailure(errorMessage));
  }
}

// // Saga to handle creating a setting
function* createSettingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSetting, action.payload);
    yield put(createSettingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createSettingFailure(errorMessage));
  }
}

// // Saga to handle updating a setting
function* updateSettingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSetting, action.payload.data, action.payload.id);
    yield put(updateSettingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateSettingFailure(errorMessage));
  }
}

// // Saga to handle updating a setting
// function* deleteSettingSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSetting, action.payload.id);
//     yield put(deleteSettingSuccess(data));
//   } catch (error: any) {
//     yield put(deleteSettingFailure(error.message));
//   }
// }

export default function* settingSaga() {
  yield takeEvery('GET_SETTING_REQUEST', fetchSettingSaga);
  yield takeEvery('CREATE_SETTING_REQUEST', createSettingSaga);
  yield takeEvery('UPDATE_SETTING_REQUEST', updateSettingSaga);
  // yield takeEvery('DELETE_SETTING_REQUEST', deleteSettingSaga);
}
