// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createProofType, getProofType, updateProofType } from '../../api/ProofTypeApi'; // Adjust the path as needed
import { 
  getProofTypeSuccess, getProofTypeFailure,
  createProofTypeSuccess,
  createProofTypeFailure,
  updateProofTypeSuccess,
  updateProofTypeFailure,
} from './actions';

// Saga to handle fetching proofTypes
function* fetchProofTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getProofType, action.payload);
    yield put(getProofTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getProofTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a proofType
function* createProofTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createProofType, action.payload);
    yield put(createProofTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createProofTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a proofType
function* updateProofTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateProofType, action.payload.data, action.payload.id);
    yield put(updateProofTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateProofTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a proofType
// function* deleteProofTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteProofType, action.payload.id);
//     yield put(deleteProofTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteProofTypeFailure(error.message));
//   }
// }

export default function* proofTypeSaga() {
  yield takeEvery('GET_PROOF_TYPE_REQUEST', fetchProofTypeSaga);
  yield takeEvery('CREATE_PROOF_TYPE_REQUEST', createProofTypeSaga);
  yield takeEvery('UPDATE_PROOF_TYPE_REQUEST', updateProofTypeSaga);
  // yield takeEvery('DELETE_PROOF_TYPE_REQUEST', deleteProofTypeSaga);
}
