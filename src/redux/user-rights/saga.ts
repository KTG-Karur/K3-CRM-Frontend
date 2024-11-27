// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createUserRights, getUserRightsApi } from '../../api/UserRightsApi'; // Adjust the path as needed
import {
    getUserRightsFailure,
    getUserRightsSuccess,
    createUserRightsFailure,
    createUserRightsSuccess,
} from './actions';

function* fetchUserRightsSaga(action: any): Generator<any, any, any> {
    try {
      const data = yield call(getUserRightsApi, action.payload.id);
        yield put(getUserRightsSuccess(data));
    } catch (error: any) {
        const errorMessage = error?.response?.data?.meta?.message
            ? error.response
            : error?.message
            ? error.message
            : 'An unexpected error occurred';

        yield put(getUserRightsFailure(errorMessage));
    }
}

function* createUserRightsSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createUserRights, action.payload);
        yield put(createUserRightsSuccess(data));
    } catch (error: any) {
        const errorMessage = error?.response?.data?.meta?.message
            ? error.response
            : error?.message
            ? error.message
            : 'An unexpected error occurred';

        yield put(createUserRightsFailure(errorMessage));
    }
}

export default function* userRightsSaga() {
    yield takeEvery('GET_USER_RIGHTS_REQUEST', fetchUserRightsSaga);
    yield takeEvery('CREATE_USER_RIGHTS_REQUEST', createUserRightsSaga);
    // yield takeEvery('DELETE_STAFF_REQUEST', deleteStaffSaga);
}
