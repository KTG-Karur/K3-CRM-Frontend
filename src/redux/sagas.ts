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
import proofTypeSaga from './proof-type/saga';
import transferStaffSaga from './transfer-staff/saga';
import deputationSaga from './deputation/saga';
import staffAdvanceSaga from './staff-advance/saga';
import holidaySaga from './holiday/saga';
import attendanceInchargeSaga from './attendance-incharge/saga';
import permissionSaga from './permission/saga';
import settingSaga from './setting/saga';
import settingWorkingDaySaga from './setting-working-day/saga';
import settingLeaveDeductionSaga from './setting-leave-deduction/saga';
import settingBenefitSaga from './setting-benefit/saga';
import staffProofSaga from './staff-proof/saga';
import staffQualificationSaga from './staff-qualification/saga';
import staffLeaveSaga from './staff-leave/saga';
import StaffAttendanceSaga from './staff-attendance/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        layoutSaga(),
        departmentSaga(),
        permissionSaga(),
        settingSaga(),
        designationSaga(),
        staffSaga(),
        bankAccountSaga(),
        roleSaga(),
        loginSaga(),
        uploadImagesSaga(),
        petrolAllowanceSaga(),
        transferStaffSaga(),
        settingWorkingDaySaga(),
        settingLeaveDeductionSaga(),
        settingBenefitSaga(),
        attendanceInchargeSaga(),
        staffAdvanceSaga(),
        deputationSaga(),
        activitySaga(),
        claimTypeSaga(),
        claimSaga(),
        branchSaga(),
        proofTypeSaga(),
        holidaySaga(),
        staffProofSaga(),
        staffQualificationSaga(),
        staffLeaveSaga(),
        StaffAttendanceSaga(),
    ]);
}
