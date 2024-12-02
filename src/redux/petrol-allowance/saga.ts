// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createPetrolAllowance, getPetrolAllowance, getPetrolAllowanceReport, updatePetrolAllowance } from '../../api/PetrolAllowanceApi'; // Adjust the path as needed
import {
  getPetrolAllowanceSuccess, getPetrolAllowanceFailure,
  createPetrolAllowanceSuccess,
  createPetrolAllowanceFailure,
  updatePetrolAllowanceSuccess,
  updatePetrolAllowanceFailure,
  getPetrolAllowanceReportFailure,
  getPetrolAllowanceReportSuccess,
} from './actions';

// Saga to handle fetching petrolAllowances
function* fetchPetrolAllowanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getPetrolAllowance, action.payload);
    yield put(getPetrolAllowanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getPetrolAllowanceFailure(errorMessage));
  }
}

// Saga to handle fetching petrolAllowances
function* fetchPetrolAllowanceReportSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getPetrolAllowanceReport, action.payload);
    yield put(getPetrolAllowanceReportSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getPetrolAllowanceReportFailure(errorMessage));
  }
}

// // Saga to handle creating a petrolAllowance
function* createPetrolAllowanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createPetrolAllowance, action.payload);
    yield put(createPetrolAllowanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createPetrolAllowanceFailure(errorMessage));
  }
}

// // Saga to handle updating a petrolAllowance
function* updatePetrolAllowanceSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updatePetrolAllowance, action.payload.data, action.payload.id);
    yield put(updatePetrolAllowanceSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updatePetrolAllowanceFailure(errorMessage));
  }
}

// // Saga to handle updating a petrolAllowance
// function* deletePetrolAllowanceSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deletePetrolAllowance, action.payload.id);
//     yield put(deletePetrolAllowanceSuccess(data));
//   } catch (error: any) {
//     yield put(deletePetrolAllowanceFailure(error.message));
//   }
// }

export default function* petrolAllowanceSaga() {
  yield takeEvery('GET_PETROL_ALLOWANCE_REQUEST', fetchPetrolAllowanceSaga);
  yield takeEvery('GET_PETROL_ALLOWANCE_REPORT_REQUEST', fetchPetrolAllowanceReportSaga);
  yield takeEvery('CREATE_PETROL_ALLOWANCE_REQUEST', createPetrolAllowanceSaga);
  yield takeEvery('UPDATE_PETROL_ALLOWANCE_REQUEST', updatePetrolAllowanceSaga);
  // yield takeEvery('DELETE_PETROL_ALLOWANCE_REQUEST', deletePetrolAllowanceSaga);
}
