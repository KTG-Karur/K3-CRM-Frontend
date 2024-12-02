// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffProof, deleteStaffProof, getStaffProof, updateStaffProof } from '../../api/StaffProofApi'; // Adjust the path as needed
import { 
  getStaffProofSuccess, getStaffProofFailure,
  createStaffProofSuccess,
  createStaffProofFailure,
  updateStaffProofSuccess,
  updateStaffProofFailure,
  deleteStaffProofSuccess,
  deleteStaffProofFailure,
} from './actions';

// Saga to handle fetching staffProofs
function* fetchStaffProofSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffProof, action.payload);
    yield put(getStaffProofSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffProofFailure(errorMessage));
  }
}

// // Saga to handle creating a staffProof
function* createStaffProofSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffProof, action.payload);
    yield put(createStaffProofSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffProofFailure(errorMessage));
  }
}

// // Saga to handle updating a staffProof
function* updateStaffProofSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffProof, action.payload.data, action.payload.id);
    yield put(updateStaffProofSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffProofFailure(errorMessage));
  }
}

// Saga to handle updating a staffProof
function* deleteStaffProofSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffProof, action.payload.id);
    yield put(deleteStaffProofSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffProofFailure(error.message));
  }
}

export default function* staffProofSaga() {
  yield takeEvery('GET_STAFF_PROOF_REQUEST', fetchStaffProofSaga);
  yield takeEvery('CREATE_STAFF_PROOF_REQUEST', createStaffProofSaga);
  yield takeEvery('UPDATE_STAFF_PROOF_REQUEST', updateStaffProofSaga);
  yield takeEvery('DELETE_STAFF_PROOF_REQUEST', deleteStaffProofSaga);
}
