// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createAdvancePaymentHistory, getAdvancePaymentHistory, updateAdvancePaymentHistory } from '../../api/AdvancePaymentHistoryApi'; 
import {
  getAdvancePaymentHistorySuccess, getAdvancePaymentHistoryFailure,
  createAdvancePaymentHistorySuccess,
  createAdvancePaymentHistoryFailure,
  updateAdvancePaymentHistorySuccess,
  updateAdvancePaymentHistoryFailure,
} from './actions';

// Saga to handle fetching advancePaymentHistorys
function* fetchAdvancePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getAdvancePaymentHistory, action.payload);
    yield put(getAdvancePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getAdvancePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle creating a advancePaymentHistory
function* createAdvancePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createAdvancePaymentHistory, action.payload);
    yield put(createAdvancePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createAdvancePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a advancePaymentHistory
function* updateAdvancePaymentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateAdvancePaymentHistory, action.payload.data, action.payload.id);
    yield put(updateAdvancePaymentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateAdvancePaymentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a advancePaymentHistory
// function* deleteAdvancePaymentHistorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteAdvancePaymentHistory, action.payload.id);
//     yield put(deleteAdvancePaymentHistorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteAdvancePaymentHistoryFailure(error.message));
//   }
// }

export default function* advancePaymentHistorySaga() {
  yield takeEvery('GET_ADVANCE_PAYMENT_HISTORY_REQUEST', fetchAdvancePaymentHistorySaga);
  yield takeEvery('CREATE_ADVANCE_PAYMENT_HISTORY_REQUEST', createAdvancePaymentHistorySaga);
  yield takeEvery('UPDATE_ADVANCE_PAYMENT_HISTORY_REQUEST', updateAdvancePaymentHistorySaga);
  // yield takeEvery('DELETE_ADVANCE_PAYMENT_HISTORY_REQUEST', deleteAdvancePaymentHistorySaga);
}
