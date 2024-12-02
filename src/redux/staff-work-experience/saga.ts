// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffWorkExperience, deleteStaffWorkExperience, getStaffWorkExperience, updateStaffWorkExperience } from '../../api/StaffWorkExperienceApi'; // Adjust the path as needed
import { 
  getStaffWorkExperienceSuccess, getStaffWorkExperienceFailure,
  createStaffWorkExperienceSuccess,
  createStaffWorkExperienceFailure,
  updateStaffWorkExperienceSuccess,
  updateStaffWorkExperienceFailure,
  deleteStaffWorkExperienceSuccess,
  deleteStaffWorkExperienceFailure,
} from './actions';

// Saga to handle fetching staffWorkExperiences
function* fetchStaffWorkExperienceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffWorkExperience, action.payload);
    yield put(getStaffWorkExperienceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffWorkExperienceFailure(errorMessage));
  }
}

// // Saga to handle creating a staffWorkExperience
function* createStaffWorkExperienceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffWorkExperience, action.payload);
    yield put(createStaffWorkExperienceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffWorkExperienceFailure(errorMessage));
  }
}

// // Saga to handle updating a staffWorkExperience
function* updateStaffWorkExperienceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffWorkExperience, action.payload.data, action.payload.id);
    yield put(updateStaffWorkExperienceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffWorkExperienceFailure(errorMessage));
  }
}

// Saga to handle updating a staffWorkExperience
function* deleteStaffWorkExperienceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffWorkExperience, action.payload.id);
    yield put(deleteStaffWorkExperienceSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffWorkExperienceFailure(error.message));
  }
}

export default function* staffWorkExperienceSaga() {
  yield takeEvery('GET_STAFF_WORK_EXPERIENCE_REQUEST', fetchStaffWorkExperienceSaga);
  yield takeEvery('CREATE_STAFF_WORK_EXPERIENCE_REQUEST', createStaffWorkExperienceSaga);
  yield takeEvery('UPDATE_STAFF_WORK_EXPERIENCE_REQUEST', updateStaffWorkExperienceSaga);
  yield takeEvery('DELETE_STAFF_WORK_EXPERIENCE_REQUEST', deleteStaffWorkExperienceSaga);
}
