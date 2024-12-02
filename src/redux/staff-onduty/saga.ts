// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffOnDuty, getStaffOnDuty, updateStaffOnDuty } from '../../api/StaffOnDutyApi'; // Adjust the path as needed
import {
  getStaffOnDutySuccess, getStaffOnDutyFailure,
  createStaffOnDutySuccess,
  createStaffOnDutyFailure,
  updateStaffOnDutySuccess,
  updateStaffOnDutyFailure,
} from './actions';

// Saga to handle fetching StaffOnDuty
function* fetchStaffOnDutySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffOnDuty, action.payload);
    yield put(getStaffOnDutySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(getStaffOnDutyFailure(errorMessage));
  }
}

// // Saga to handle creating a StaffOnDuty
function* createStaffOnDutySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffOnDuty, action.payload);
    yield put(createStaffOnDutySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';

    yield put(createStaffOnDutyFailure(errorMessage));
  }
}

// // Saga to handle updating a StaffOnDuty
function* updateStaffOnDutySaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffOnDuty, action.payload.data, action.payload.id);
    yield put(updateStaffOnDutySuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message
        ? error.message
        : 'An unexpected error occurred';
    yield put(updateStaffOnDutyFailure(errorMessage));
  }
}

// // Saga to handle updating a StaffOnDuty
// function* deleteStaffOnDutySaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffOnDuty, action.payload.id);
//     yield put(deleteStaffOnDutySuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffOnDutyFailure(error.message));
//   }
// }

export default function* StaffOnDutySaga() {
  yield takeEvery('GET_STAFF_ON_DUTY_REQUEST', fetchStaffOnDutySaga);
  yield takeEvery('CREATE_STAFF_ON_DUTY_REQUEST', createStaffOnDutySaga);
  yield takeEvery('UPDATE_STAFF_ON_DUTY_REQUEST', updateStaffOnDutySaga);
  // yield takeEvery('DELETE_STAFF_ON_DUTY_REQUEST', deleteStaffOnDutySaga);
}
