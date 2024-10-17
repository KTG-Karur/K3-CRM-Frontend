// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createClaim, getClaim, updateClaim } from '../../api/ClaimApi'; // Adjust the path as needed
import { 
  getClaimSuccess, getClaimFailure,
  createClaimSuccess,
  createClaimFailure,
  updateClaimSuccess,
  updateClaimFailure,
} from './actions';

// Saga to handle fetching claims
function* fetchClaimSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getClaim, action.payload);
    yield put(getClaimSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getClaimFailure(errorMessage));
  }
}

// // Saga to handle creating a claim
function* createClaimSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createClaim, action.payload);
    yield put(createClaimSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createClaimFailure(errorMessage));
  }
}

// // Saga to handle updating a claim
function* updateClaimSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateClaim, action.payload.data, action.payload.id);
    yield put(updateClaimSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateClaimFailure(errorMessage));
  }
}

// // Saga to handle updating a claim
// function* deleteClaimSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteClaim, action.payload.id);
//     yield put(deleteClaimSuccess(data));
//   } catch (error: any) {
//     yield put(deleteClaimFailure(error.message));
//   }
// }

export default function* claimSaga() {
  yield takeEvery('GET_CLAIM_REQUEST', fetchClaimSaga);
  yield takeEvery('CREATE_CLAIM_REQUEST', createClaimSaga);
  yield takeEvery('UPDATE_CLAIM_REQUEST', updateClaimSaga);
  // yield takeEvery('DELETE_CLAIM_REQUEST', deleteClaimSaga);
}
