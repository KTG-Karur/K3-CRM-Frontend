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
import advancePaymentHistorySaga from './advance-payment-history/saga';
import staffsalarySaga from './staff-salary/saga';
import staffRightsSaga from './staff-rights/saga';
import StaffOnDutySaga from './staff-onduty/saga';
import trainingTypeSaga from './training-type/saga';
import staffTrainingSaga from './staff-training/saga';
import rolePermissionSaga from './role-permission/saga';
import salaryIncreamentHistorySaga from './salary-increament-history/saga';
import pageSaga from './page/saga';
import staffAchievementSaga from './staff-achievement/saga';
import staffWorkExperienceSaga from './staff-work-experience/saga';
import staffRelationSaga from './staff-relation/saga';
import staffLanguageSaga from './staff-language/saga';

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
        advancePaymentHistorySaga(),
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
        staffsalarySaga(),
        staffRightsSaga(),
        StaffOnDutySaga(),
        trainingTypeSaga(),
        staffTrainingSaga(),
        rolePermissionSaga(),
        salaryIncreamentHistorySaga(),
        pageSaga(),
        staffAchievementSaga(),
        staffWorkExperienceSaga(),
        staffRelationSaga(),
        staffLanguageSaga(),
    ]);
}
