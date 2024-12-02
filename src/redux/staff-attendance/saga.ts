// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    createStaffAttendance,
    getStaffAttendance,
    getStaffAttendanceReport,
    updateStaffAttendance,
} from '../../api/StaffAttendanceApi'; // Adjust the path as needed
import {
    getStaffAttendanceSuccess,
    getStaffAttendanceFailure,
    createStaffAttendanceSuccess,
    createStaffAttendanceFailure,
    updateStaffAttendanceSuccess,
    updateStaffAttendanceFailure,
    getStaffAttendanceReportSuccess,
    getStaffAttendanceReportFailure,
} from './actions';

// Saga to handle fetching StaffAttendances
function* fetchStaffAttendanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getStaffAttendance, action.payload);
        yield put(getStaffAttendanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(getStaffAttendanceFailure(errorMessage));
    }
}

function* fetchStaffAttendanceReportSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getStaffAttendanceReport, action.payload);
        yield put(getStaffAttendanceReportSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(getStaffAttendanceReportFailure(errorMessage));
    }
}

// // Saga to handle creating a StaffAttendance
function* createStaffAttendanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createStaffAttendance, action.payload);
        yield put(createStaffAttendanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(createStaffAttendanceFailure(errorMessage));
    }
}

// // Saga to handle updating a StaffAttendance
function* updateStaffAttendanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(updateStaffAttendance, action.payload.data);
        yield put(updateStaffAttendanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(updateStaffAttendanceFailure(errorMessage));
    }
}

// // Saga to handle updating a StaffAttendance
// function* deleteStaffAttendanceSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffAttendance, action.payload.id);
//     yield put(deleteStaffAttendanceSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffAttendanceFailure(error.message));
//   }
// }

export default function* StaffAttendanceSaga() {
    yield takeEvery('GET_STAFF_ATTENDANCE_REQUEST', fetchStaffAttendanceSaga);
    yield takeEvery('GET_STAFF_ATTENDANCE_REPORT_REQUEST', fetchStaffAttendanceReportSaga);
    yield takeEvery('CREATE_STAFF_ATTENDANCE_REQUEST', createStaffAttendanceSaga);
    yield takeEvery('UPDATE_STAFF_ATTENDANCE_REQUEST', updateStaffAttendanceSaga);
    // yield takeEvery('DELETE_STAFF_ATTENDANCE_REQUEST', deleteStaffAttendanceSaga);
}
