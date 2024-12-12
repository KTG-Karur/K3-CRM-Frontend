// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffSalary, getStaffSalary, getStaffSalaryDetail, updateStaffSalary } from '../../api/StaffSalaryApi'; // Adjust the path as needed
import { 
  getStaffSalarySuccess, getStaffSalaryFailure,
  createStaffSalarySuccess,
  createStaffSalaryFailure,
  updateStaffSalarySuccess,
  updateStaffSalaryFailure,
  getStaffSalaryDetailSuccess,
  getStaffSalaryDetailFailure,
} from './actions';

// Saga to handle fetching staffsalarys
function* fetchStaffSalarySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffSalary, action.payload);
    yield put(getStaffSalarySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffSalaryFailure(errorMessage));
  }
}

// Saga to handle fetching staffsalarys
function* fetchStaffSalaryDetailSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffSalaryDetail, action.payload);
    yield put(getStaffSalaryDetailSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffSalaryDetailFailure(errorMessage));
  }
}

// // Saga to handle creating a staffsalary
function* createStaffSalarySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffSalary, action.payload);
    yield put(createStaffSalarySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffSalaryFailure(errorMessage));
  }
}

// // Saga to handle updating a staffsalary
function* updateStaffSalarySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffSalary, action.payload.data, action.payload.id);
    yield put(updateStaffSalarySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffSalaryFailure(errorMessage));
  }
}

// // Saga to handle updating a staffsalary
// function* deleteStaffSalarySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffSalary, action.payload.id);
//     yield put(deleteStaffSalarySuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffSalaryFailure(error.message));
//   }
// }

export default function* staffsalarySaga() {
  yield takeEvery('GET_STAFFSALARY_DETAIL_REQUEST', fetchStaffSalaryDetailSaga);
  yield takeEvery('GET_STAFFSALARY_REQUEST', fetchStaffSalarySaga);
  yield takeEvery('CREATE_STAFFSALARY_REQUEST', createStaffSalarySaga);
  yield takeEvery('UPDATE_STAFFSALARY_REQUEST', updateStaffSalarySaga);
  // yield takeEvery('DELETE_STAFFSALARY_REQUEST', deleteStaffSalarySaga);
}
