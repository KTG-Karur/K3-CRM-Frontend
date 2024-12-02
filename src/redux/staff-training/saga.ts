// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffTraining, getStaffTraining, updateStaffTraining } from '../../api/StaffTrainingApi'; // Adjust the path as needed
import { 
  getStaffTrainingSuccess, getStaffTrainingFailure,
  createStaffTrainingSuccess,
  createStaffTrainingFailure,
  updateStaffTrainingSuccess,
  updateStaffTrainingFailure,
} from './actions';

// Saga to handle fetching staffTrainings
function* fetchStaffTrainingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffTraining, action.payload);
    yield put(getStaffTrainingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffTrainingFailure(errorMessage));
  }
}

// // Saga to handle creating a staffTraining
function* createStaffTrainingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffTraining, action.payload);
    yield put(createStaffTrainingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffTrainingFailure(errorMessage));
  }
}

// // Saga to handle updating a staffTraining
function* updateStaffTrainingSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffTraining, action.payload.data, action.payload.id);
    yield put(updateStaffTrainingSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffTrainingFailure(errorMessage));
  }
}

// // Saga to handle updating a staffTraining
// function* deleteStaffTrainingSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffTraining, action.payload.id);
//     yield put(deleteStaffTrainingSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffTrainingFailure(error.message));
//   }
// }

export default function* staffTrainingSaga() {
  yield takeEvery('GET_STAFF_TRAINING_REQUEST', fetchStaffTrainingSaga);
  yield takeEvery('CREATE_STAFF_TRAINING_REQUEST', createStaffTrainingSaga);
  yield takeEvery('UPDATE_STAFF_TRAINING_REQUEST', updateStaffTrainingSaga);
  // yield takeEvery('DELETE_STAFF_TRAINING_REQUEST', deleteStaffTrainingSaga);
}
