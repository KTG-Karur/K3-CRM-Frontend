// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffAchievement, deleteStaffAchievement, getStaffAchievement, updateStaffAchievement } from '../../api/staffAchievementsApi'; // Adjust the path as needed
import { 
  getStaffAchievementSuccess, getStaffAchievementFailure,
  createStaffAchievementSuccess,
  createStaffAchievementFailure,
  updateStaffAchievementSuccess,
  updateStaffAchievementFailure,
  deleteStaffAchievementSuccess,
  deleteStaffAchievementFailure,
} from './actions';

// Saga to handle fetching staffAchievements
function* fetchStaffAchievementSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffAchievement, action.payload);
    yield put(getStaffAchievementSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffAchievementFailure(errorMessage));
  }
}

// // Saga to handle creating a staffAchievement
function* createStaffAchievementSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffAchievement, action.payload);
    yield put(createStaffAchievementSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffAchievementFailure(errorMessage));
  }
}

// // Saga to handle updating a staffAchievement
function* updateStaffAchievementSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffAchievement, action.payload.data, action.payload.id);
    yield put(updateStaffAchievementSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffAchievementFailure(errorMessage));
  }
}

// // Saga to handle updating a staffAchievement
function* deleteStaffAchievementSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffAchievement, action.payload.id);
    yield put(deleteStaffAchievementSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffAchievementFailure(error.message));
  }
}

export default function* staffAchievementSaga() {
  yield takeEvery('GET_STAFF_ACHIEVEMENT_REQUEST', fetchStaffAchievementSaga);
  yield takeEvery('CREATE_STAFF_ACHIEVEMENT_REQUEST', createStaffAchievementSaga);
  yield takeEvery('UPDATE_STAFF_ACHIEVEMENT_REQUEST', updateStaffAchievementSaga);
  yield takeEvery('DELETE_STAFF_ACHIEVEMENT_REQUEST', deleteStaffAchievementSaga);
}
