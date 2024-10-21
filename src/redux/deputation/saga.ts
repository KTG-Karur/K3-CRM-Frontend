// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createDeputation, getDeputation, updateDeputation } from '../../api/DeputationApi'; // Adjust the path as needed
import {
  getDeputationSuccess, getDeputationFailure,
  createDeputationSuccess,
  createDeputationFailure,
  updateDeputationSuccess,
  updateDeputationFailure,
} from './actions';

// Saga to handle fetching deputations
function* fetchDeputationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getDeputation, action.payload);
    yield put(getDeputationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getDeputationFailure(errorMessage));
  }
}

// // Saga to handle creating a deputation
function* createDeputationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createDeputation, action.payload);
    yield put(createDeputationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createDeputationFailure(errorMessage));
  }
}

// // Saga to handle updating a deputation
function* updateDeputationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateDeputation, action.payload.data, action.payload.id);
    yield put(updateDeputationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateDeputationFailure(errorMessage));
  }
}

// // Saga to handle updating a deputation
// function* deleteDeputationSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteDeputation, action.payload.id);
//     yield put(deleteDeputationSuccess(data));
//   } catch (error: any) {
//     yield put(deleteDeputationFailure(error.message));
//   }
// }

export default function* deputationSaga() {
  yield takeEvery('GET_DEPUTATION_REQUEST', fetchDeputationSaga);
  yield takeEvery('CREATE_DEPUTATION_REQUEST', createDeputationSaga);
  yield takeEvery('UPDATE_DEPUTATION_REQUEST', updateDeputationSaga);
  // yield takeEvery('DELETE_DEPUTATION_REQUEST', deleteDeputationSaga);
}
