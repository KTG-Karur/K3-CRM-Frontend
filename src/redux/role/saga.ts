// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createRole, getRole, updateRole } from '../../api/RoleApi'; // Adjust the path as needed
import { 
  getRoleSuccess, getRoleFailure,
  createRoleSuccess,
  createRoleFailure,
  updateRoleSuccess,
  updateRoleFailure,
} from './actions';

// Saga to handle fetching roles
function* fetchRoleSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getRole, action.payload);
    yield put(getRoleSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getRoleFailure(errorMessage));
  }
}

// // Saga to handle creating a role
function* createRoleSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createRole, action.payload);
    yield put(createRoleSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createRoleFailure(errorMessage));
  }
}

// // Saga to handle updating a role
function* updateRoleSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateRole, action.payload.data, action.payload.id);
    yield put(updateRoleSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateRoleFailure(errorMessage));
  }
}

// // Saga to handle updating a role
// function* deleteRoleSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteRole, action.payload.id);
//     yield put(deleteRoleSuccess(data));
//   } catch (error: any) {
//     yield put(deleteRoleFailure(error.message));
//   }
// }

export default function* roleSaga() {
  yield takeEvery('GET_ROLE_REQUEST', fetchRoleSaga);
  yield takeEvery('CREATE_ROLE_REQUEST', createRoleSaga);
  yield takeEvery('UPDATE_ROLE_REQUEST', updateRoleSaga);
  // yield takeEvery('DELETE_ROLE_REQUEST', deleteRoleSaga);
}
