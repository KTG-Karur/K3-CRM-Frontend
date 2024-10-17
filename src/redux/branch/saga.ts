// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createBranch, getBranch, updateBranch } from '../../api/BranchApi'; // Adjust the path as needed
import { 
  getBranchSuccess, getBranchFailure,
  createBranchSuccess,
  createBranchFailure,
  updateBranchSuccess,
  updateBranchFailure,
} from './actions';

// Saga to handle fetching branchs
function* fetchBranchSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getBranch, action.payload);
    yield put(getBranchSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getBranchFailure(errorMessage));
  }
}

// // Saga to handle creating a branch
function* createBranchSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createBranch, action.payload);
    yield put(createBranchSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createBranchFailure(errorMessage));
  }
}

// // Saga to handle updating a branch
function* updateBranchSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateBranch, action.payload.data, action.payload.id);
    yield put(updateBranchSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateBranchFailure(errorMessage));
  }
}

// // Saga to handle updating a branch
// function* deleteBranchSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteBranch, action.payload.id);
//     yield put(deleteBranchSuccess(data));
//   } catch (error: any) {
//     yield put(deleteBranchFailure(error.message));
//   }
// }

export default function* branchSaga() {
  yield takeEvery('GET_BRANCH_REQUEST', fetchBranchSaga);
  yield takeEvery('CREATE_BRANCH_REQUEST', createBranchSaga);
  yield takeEvery('UPDATE_BRANCH_REQUEST', updateBranchSaga);
  // yield takeEvery('DELETE_BRANCH_REQUEST', deleteBranchSaga);
}
