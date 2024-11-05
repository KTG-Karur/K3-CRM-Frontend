// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffRelation, deleteStaffRelation, getStaffRelation, updateStaffRelation } from '../../api/StaffRelationApi'; // Adjust the path as needed
import { 
  getStaffRelationSuccess, getStaffRelationFailure,
  createStaffRelationSuccess,
  createStaffRelationFailure,
  updateStaffRelationSuccess,
  updateStaffRelationFailure,
  deleteStaffRelationSuccess,
  deleteStaffRelationFailure,
} from './actions';

// Saga to handle fetching staffRelations
function* fetchStaffRelationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getStaffRelation, action.payload);
    yield put(getStaffRelationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getStaffRelationFailure(errorMessage));
  }
}

// // Saga to handle creating a staffRelation
function* createStaffRelationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(createStaffRelation, action.payload);
    yield put(createStaffRelationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(createStaffRelationFailure(errorMessage));
  }
}

// // Saga to handle updating a staffRelation
function* updateStaffRelationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(updateStaffRelation, action.payload.data, action.payload.id);
    yield put(updateStaffRelationSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(updateStaffRelationFailure(errorMessage));
  }
}

// // Saga to handle updating a staffRelation
function* deleteStaffRelationSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(deleteStaffRelation, action.payload.id);
    yield put(deleteStaffRelationSuccess(data));
  } catch (error: any) {
    yield put(deleteStaffRelationFailure(error.message));
  }
}

export default function* staffRelationSaga() {
  yield takeEvery('GET_STAFF_RELATION_REQUEST', fetchStaffRelationSaga);
  yield takeEvery('CREATE_STAFF_RELATION_REQUEST', createStaffRelationSaga);
  yield takeEvery('UPDATE_STAFF_RELATION_REQUEST', updateStaffRelationSaga);
  yield takeEvery('DELETE_STAFF_RELATION_REQUEST', deleteStaffRelationSaga);
}
