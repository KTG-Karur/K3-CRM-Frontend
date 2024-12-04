// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { createStaffAdvance, getStaffAdvance, getStaffAdvanceLedger, updateStaffAdvance } from '../../api/StaffAdvanceApi'; // Adjust the path as needed
import {
    getStaffAdvanceSuccess,
    getStaffAdvanceFailure,
    createStaffAdvanceSuccess,
    createStaffAdvanceFailure,
    updateStaffAdvanceSuccess,
    updateStaffAdvanceFailure,
    getStaffAdvanceLedgerSuccess,
    getStaffAdvanceLedgerFailure,
} from './actions';

// Saga to handle fetching staffAdvances
function* fetchStaffAdvanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getStaffAdvance, action.payload);
        yield put(getStaffAdvanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(getStaffAdvanceFailure(errorMessage));
    }
}

function* fetchStaffAdvanceLedgerSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(getStaffAdvanceLedger, action.payload);
        yield put(getStaffAdvanceLedgerSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(getStaffAdvanceLedgerFailure(errorMessage));
    }
}

// // Saga to handle creating a staffAdvance
function* createStaffAdvanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(createStaffAdvance, action.payload);
        yield put(createStaffAdvanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';

        yield put(createStaffAdvanceFailure(errorMessage));
    }
}

// // Saga to handle updating a staffAdvance
function* updateStaffAdvanceSaga(action: any): Generator<any, any, any> {
    try {
        const data = yield call(updateStaffAdvance, action.payload.data, action.payload.id);
        yield put(updateStaffAdvanceSuccess(data));
    } catch (error: any) {
        const errorMessage =
            error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : error.message
                ? error.message
                : 'An unexpected error occurred';
        yield put(updateStaffAdvanceFailure(errorMessage));
    }
}

// // Saga to handle updating a staffAdvance
// function* deleteStaffAdvanceSaga(action: any): Generator<any, any, any> {
//   try {
//     const data = yield call(deleteStaffAdvance, action.payload.id);
//     yield put(deleteStaffAdvanceSuccess(data));
//   } catch (error: any) {
//     yield put(deleteStaffAdvanceFailure(error.message));
//   }
// }

export default function* staffAdvanceSaga() {
    yield takeEvery('GET_STAFF_ADVANCE_REQUEST', fetchStaffAdvanceSaga);
    yield takeEvery('GET_STAFF_ADVANCE_LEDGER_REQUEST', fetchStaffAdvanceLedgerSaga);
    yield takeEvery('CREATE_STAFF_ADVANCE_REQUEST', createStaffAdvanceSaga);
    yield takeEvery('UPDATE_STAFF_ADVANCE_REQUEST', updateStaffAdvanceSaga);
    // yield takeEvery('DELETE_STAFF_ADVANCE_REQUEST', deleteStaffAdvanceSaga);
}
