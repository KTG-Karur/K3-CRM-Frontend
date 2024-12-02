// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffLanguage, deleteStaffLanguage, getStaffLanguage, updateStaffLanguage } from '../../api/StaffLanguageApi'; // Adjust the path as needed
import { 
  getStaffLanguageSuccess, getStaffLanguageFailure,
  createStaffLanguageSuccess,
  createStaffLanguageFailure,
  updateStaffLanguageSuccess,
  updateStaffLanguageFailure,
  deleteStaffLanguageSuccess,
  deleteStaffLanguageFailure,
} from './actions';

// Saga to handle fetching staffLanguages
function* fetchStaffLanguageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffLanguage, action.payload);
    yield put(getStaffLanguageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffLanguageFailure(errorMessage));
  }
}

// // Saga to handle creating a staffLanguage
function* createStaffLanguageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffLanguage, action.payload);
    yield put(createStaffLanguageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffLanguageFailure(errorMessage));
  }
}

// // Saga to handle updating a staffLanguage
function* updateStaffLanguageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffLanguage, action.payload.data, action.payload.id);
    yield put(updateStaffLanguageSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffLanguageFailure(errorMessage));
  }
}

// // Saga to handle updating a staffLanguage
function* deleteStaffLanguageSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffLanguage, action.payload.id);
    yield put(deleteStaffLanguageSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffLanguageFailure(error.message));
  }
}

export default function* staffLanguageSaga() {
  yield takeEvery('GET_STAFF_LANGUAGE_REQUEST', fetchStaffLanguageSaga);
  yield takeEvery('CREATE_STAFF_LANGUAGE_REQUEST', createStaffLanguageSaga);
  yield takeEvery('UPDATE_STAFF_LANGUAGE_REQUEST', updateStaffLanguageSaga);
  yield takeEvery('DELETE_STAFF_LANGUAGE_REQUEST', deleteStaffLanguageSaga);
}
