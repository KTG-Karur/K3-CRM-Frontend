// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createClaimType, getClaimType, updateClaimType } from '../../api/ClaimTypeApi'; // Adjust the path as needed
import { 
  getClaimTypeSuccess, getClaimTypeFailure,
  createClaimTypeSuccess,
  createClaimTypeFailure,
  updateClaimTypeSuccess,
  updateClaimTypeFailure,
} from './actions';

// Saga to handle fetching claimTypes
function* fetchClaimTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getClaimType, action.payload);
    yield put(getClaimTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getClaimTypeFailure(errorMessage));
  }
}

// // Saga to handle creating a claimType
function* createClaimTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createClaimType, action.payload);
    yield put(createClaimTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createClaimTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a claimType
function* updateClaimTypeSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateClaimType, action.payload.data, action.payload.id);
    yield put(updateClaimTypeSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateClaimTypeFailure(errorMessage));
  }
}

// // Saga to handle updating a claimType
// function* deleteClaimTypeSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteClaimType, action.payload.id);
//     yield put(deleteClaimTypeSuccess(data));
//   } catch (error: any) {
//     yield put(deleteClaimTypeFailure(error.message));
//   }
// }

export default function* claimTypeSaga() {
  yield takeEvery('GET_CLAIM_TYPE_REQUEST', fetchClaimTypeSaga);
  yield takeEvery('CREATE_CLAIM_TYPE_REQUEST', createClaimTypeSaga);
  yield takeEvery('UPDATE_CLAIM_TYPE_REQUEST', updateClaimTypeSaga);
  // yield takeEvery('DELETE_CLAIM_TYPE_REQUEST', deleteClaimTypeSaga);
}
