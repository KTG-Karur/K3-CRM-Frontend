// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createBankAccount, getBankAccount, updateBankAccount } from '../../api/BankAccountApi'; // Adjust the path as needed
import { 
  getBankAccountSuccess, getBankAccountFailure,
  createBankAccountSuccess,
  createBankAccountFailure,
  updateBankAccountSuccess,
  updateBankAccountFailure,
} from './actions';

// Saga to handle fetching bankAccounts
function* fetchBankAccountSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getBankAccount, action.payload);
    yield put(getBankAccountSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(getBankAccountFailure(errorMessage));
  }
}

// // Saga to handle creating a bankAccount
function* createBankAccountSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createBankAccount, action.payload);
    yield put(createBankAccountSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(createBankAccountFailure(errorMessage));
  }
}

// // Saga to handle updating a bankAccount
function* updateBankAccountSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateBankAccount, action.payload.data, action.payload.id);
    yield put(updateBankAccountSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';
    yield put(updateBankAccountFailure(errorMessage));
  }
}

// // Saga to handle updating a bankAccount
// function* deleteBankAccountSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteBankAccount, action.payload.id);
//     yield put(deleteBankAccountSuccess(data));
//   } catch (error: any) {
//     yield put(deleteBankAccountFailure(errorMessage));
//   }
// }

export default function* bankAccountSaga() {
  yield takeEvery('GET_BANK_ACCOUNT_REQUEST', fetchBankAccountSaga);
  yield takeEvery('CREATE_BANK_ACCOUNT_REQUEST', createBankAccountSaga);
  yield takeEvery('UPDATE_BANK_ACCOUNT_REQUEST', updateBankAccountSaga);
  // yield takeEvery('DELETE_BANK_ACCOUNT_REQUEST', deleteBankAccountSaga);
}
