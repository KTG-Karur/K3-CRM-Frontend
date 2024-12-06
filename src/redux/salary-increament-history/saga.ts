// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createSalaryIncreamentHistory, getSalaryIncreamentHistory, updateSalaryIncreamentHistory } from '../../api/SalaryIncreamentHistoryApi'; // Adjust the path as needed
import { 
  getSalaryIncreamentHistorySuccess, getSalaryIncreamentHistoryFailure,
  createSalaryIncreamentHistorySuccess,
  createSalaryIncreamentHistoryFailure,
  updateSalaryIncreamentHistorySuccess,
  updateSalaryIncreamentHistoryFailure,
} from './actions';

// Saga to handle fetching salaryIncreamentHistorys
function* fetchSalaryIncreamentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getSalaryIncreamentHistory, action.payload);
    yield put(getSalaryIncreamentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getSalaryIncreamentHistoryFailure(errorMessage));
  }
}

// // Saga to handle creating a salaryIncreamentHistory
function* createSalaryIncreamentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createSalaryIncreamentHistory, action.payload);
    yield put(createSalaryIncreamentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createSalaryIncreamentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a salaryIncreamentHistory
function* updateSalaryIncreamentHistorySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateSalaryIncreamentHistory, action.payload.data, action.payload.id);
    yield put(updateSalaryIncreamentHistorySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateSalaryIncreamentHistoryFailure(errorMessage));
  }
}

// // Saga to handle updating a salaryIncreamentHistory
// function* deleteSalaryIncreamentHistorySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteSalaryIncreamentHistory, action.payload.id);
//     yield put(deleteSalaryIncreamentHistorySuccess(data));
//   } catch (error: any) {
//     yield put(deleteSalaryIncreamentHistoryFailure(error.message));
//   }
// }

export default function* salaryIncreamentHistorySaga() {
  yield takeEvery('GET_SALARY_INCREAMENT_HISTORY_REQUEST', fetchSalaryIncreamentHistorySaga);
  yield takeEvery('CREATE_SALARY_INCREAMENT_HISTORY_REQUEST', createSalaryIncreamentHistorySaga);
  yield takeEvery('UPDATE_SALARY_INCREAMENT_HISTORY_REQUEST', updateSalaryIncreamentHistorySaga);
  // yield takeEvery('DELETE_SALARY_INCREAMENT_HISTORY_REQUEST', deleteSalaryIncreamentHistorySaga);
}
