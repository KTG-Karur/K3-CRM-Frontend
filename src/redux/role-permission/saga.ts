// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createRolePermission, getRolePermission, updateRolePermission } from '../../api/RolePermissionApi'; // Adjust the path as needed
import { 
  getRolePermissionSuccess, getRolePermissionFailure,
  createRolePermissionSuccess,
  createRolePermissionFailure,
  updateRolePermissionSuccess,
  updateRolePermissionFailure,
} from './actions';

// Saga to handle fetching rolePermissions
function* fetchRolePermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getRolePermission, action.payload);
    yield put(getRolePermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getRolePermissionFailure(errorMessage));
  }
}

// // Saga to handle creating a rolePermission
function* createRolePermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createRolePermission, action.payload);
    yield put(createRolePermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createRolePermissionFailure(errorMessage));
  }
}

// // Saga to handle updating a rolePermission
function* updateRolePermissionSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateRolePermission, action.payload.data, action.payload.id);
    yield put(updateRolePermissionSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateRolePermissionFailure(errorMessage));
  }
}

// // Saga to handle updating a rolePermission
// function* deleteRolePermissionSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteRolePermission, action.payload.id);
//     yield put(deleteRolePermissionSuccess(data));
//   } catch (error: any) {
//     yield put(deleteRolePermissionFailure(error.message));
//   }
// }

export default function* rolePermissionSaga() {
  yield takeEvery('GET_ROLE_PERMISSION_REQUEST', fetchRolePermissionSaga);
  yield takeEvery('CREATE_ROLE_PERMISSION_REQUEST', createRolePermissionSaga);
  yield takeEvery('UPDATE_ROLE_PERMISSION_REQUEST', updateRolePermissionSaga);
  // yield takeEvery('DELETE_ROLE_PERMISSION_REQUEST', deleteRolePermissionSaga);
}
