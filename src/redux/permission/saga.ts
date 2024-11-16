// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createPermission, getPermission, updatePermission } from '../../api/PermissionApi'; // Adjust the path as needed
import { 
  getPermissionSuccess, getPermissionFailure,
  createPermissionSuccess,
  createPermissionFailure,
  updatePermissionSuccess,
  updatePermissionFailure,
} from './actions';

// Saga to handle fetching permissions
function* fetchPermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getPermission, action.payload);
    yield put(getPermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getPermissionFailure(errorMessage));
  }
}

// // Saga to handle creating a permission
function* createPermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createPermission, action.payload);
    yield put(createPermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createPermissionFailure(errorMessage));
  }
}

// // Saga to handle updating a permission
function* updatePermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updatePermission, action.payload.data, action.payload.id);
    yield put(updatePermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updatePermissionFailure(errorMessage));
  }
}

// // Saga to handle updating a permission
// function* deletePermissionSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deletePermission, action.payload.id);
//     yield put(deletePermissionSuccess(data));
//   } catch (error: any) {
//     yield put(deletePermissionFailure(error.message));
//   }
// }

export default function* permissionSaga() {
  yield takeEvery('GET_PERMISSION_REQUEST', fetchPermissionSaga);
  yield takeEvery('CREATE_PERMISSION_REQUEST', createPermissionSaga);
  yield takeEvery('UPDATE_PERMISSION_REQUEST', updatePermissionSaga);
  // yield takeEvery('DELETE_PERMISSION_REQUEST', deletePermissionSaga);
}
