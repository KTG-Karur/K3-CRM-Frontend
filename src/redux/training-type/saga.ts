// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createTrainingType, getTrainingType, updateTrainingType } from '../../api/TrainingTypeApi'; // Adjust the path as needed
import { 
  getTrainingTypeSuccess, getTrainingTypeFailure,
  createTrainingTypeSuccess,
  createTrainingTypeFailure,
  updateTrainingTypeSuccess,
  updateTrainingTypeFailure,
} from './actions';

// Saga to handle fetching trainingTypes
function* fetchTrainingTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getTrainingType, action.payload);
    yield put(getTrainingTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getTrainingTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a trainingType
function* createTrainingTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createTrainingType, action.payload);
    yield put(createTrainingTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createTrainingTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a trainingType
function* updateTrainingTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateTrainingType, action.payload.data, action.payload.id);
    yield put(updateTrainingTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateTrainingTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a trainingType
// function* deleteTrainingTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteTrainingType, action.payload.id);
//     yield put(deleteTrainingTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteTrainingTypeFailure(error.message));
//   }
// }

export default function* trainingTypeSaga() {
  yield takeEvery('GET_TRAINING_TYPE_REQUEST', fetchTrainingTypeSaga);
  yield takeEvery('CREATE_TRAINING_TYPE_REQUEST', createTrainingTypeSaga);
  yield takeEvery('UPDATE_TRAINING_TYPE_REQUEST', updateTrainingTypeSaga);
  // yield takeEvery('DELETE_TRAINING_TYPE_REQUEST', deleteTrainingTypeSaga);
}
