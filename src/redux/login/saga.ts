// saga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { getEmployeeLogin } from '../../api/LoginApi'; // Adjust the path as needed
import { 
  getEmployeeLoginSuccess, getEmployeeLoginFailure,
} from './actions';

// Saga to handle fetching employeeLogins
function* fetchEmployeeLoginSaga(action: any): Generator<any, any, any> {
  try {
    const data = yield call(getEmployeeLogin, action.payload);
    yield put(getEmployeeLoginSuccess(data));
  } catch (error: any) {
    const errorMessage = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
      ? error.message
      : 'An unexpected error occurred';

    yield put(getEmployeeLoginFailure(errorMessage));
  }
}

export default function* loginSaga() {
  yield takeEvery('GET_EMPLOYEE_LOGIN_REQUEST', fetchEmployeeLoginSaga);
}
