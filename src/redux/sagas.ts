import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import departmentSaga from './department/saga';
import designationSaga from './designation/saga';
import bankAccountSaga from './bank-account/saga';
import roleSaga from './role/saga';
import loginSaga from './login/saga';
import uploadImagesSaga from './uploads/saga';
import petrolAllowanceSaga from './petrol-allowance/saga';
import staffSaga from './staff/saga';
import activitySaga from './activity/saga';
import claimTypeSaga from './claim-type/saga';
import claimSaga from './claim/saga';
import branchSaga from './branch/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        departmentSaga(),
        designationSaga(),
        staffSaga(),
        bankAccountSaga(),
        roleSaga(),
        loginSaga(),
        uploadImagesSaga(),
        petrolAllowanceSaga(),
        activitySaga(),
        claimTypeSaga(),
        claimSaga(),
        branchSaga(),
    ]);
}
