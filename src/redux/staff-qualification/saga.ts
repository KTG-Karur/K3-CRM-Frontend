// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffQualification, deleteStaffQualification, getStaffQualification, updateStaffQualification } from '../../api/StaffQualificationApi'; // Adjust the path as needed
import { 
  getStaffQualificationSuccess, getStaffQualificationFailure,
  createStaffQualificationSuccess,
  createStaffQualificationFailure,
  updateStaffQualificationSuccess,
  updateStaffQualificationFailure,deleteStaffQualificationFailure, deleteStaffQualificationSuccess
} from './actions';

// Saga to handle fetching staffQualifications
function* fetchStaffQualificationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffQualification, action.payload);
    yield put(getStaffQualificationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffQualificationFailure(errorMessage));
  }
}

// // Saga to handle creating a staffQualification
function* createStaffQualificationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffQualification, action.payload);
    yield put(createStaffQualificationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffQualificationFailure(errorMessage));
  }
}

// // Saga to handle updating a staffQualification
function* updateStaffQualificationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffQualification, action.payload.data, action.payload.id);
    yield put(updateStaffQualificationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffQualificationFailure(errorMessage));
  }
}

// // Saga to handle updating a staffQualification
function* deleteStaffQualificationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffQualification, action.payload.id);
    yield put(deleteStaffQualificationSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffQualificationFailure(error.message));
  }
}

export default function* staffQualificationSaga() {
  yield takeEvery('GET_STAFF_QUALIFICATION_REQUEST', fetchStaffQualificationSaga);
  yield takeEvery('CREATE_STAFF_QUALIFICATION_REQUEST', createStaffQualificationSaga);
  yield takeEvery('UPDATE_STAFF_QUALIFICATION_REQUEST', updateStaffQualificationSaga);
  yield takeEvery('DELETE_STAFF_QUALIFICATION_REQUEST', deleteStaffQualificationSaga);
}
