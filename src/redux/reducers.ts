import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import PageTitle from './pageTitle/reducers';
import departmentReducer from './department/reducers';
import designationReducer from './designation/reducers';
import roleReducer from './role/reducers';
import loginReducer from './login/reducers';
import uploadImagesReducer from './uploads/reducers';
import petrolAllowanceReducer from './petrol-allowance/reducers';
import staffReducer from './staff/reducers';
import activityReducer from './activity/reducers';
import claimTypeReducer from './claim-type/reducers';
import claimReducer from './claim/reducers';
import branchReducer from './branch/reducers';
import proofTypeReducer from './proof-type/reducers';
import transferStaffReducer from './transfer-staff/reducers';
import deputationReducer from './deputation/reducers';
import staffAdvanceReducer from './staff-advance/reducers';
import holidayReducer from './holiday/reducers';
<<<<<<< HEAD
import attendanceInchargeReducer from './attendance-incharge/reducers';
import permissionReducer from './permission/reducers';
import settingReducer from './setting/reducers';
import settingWorkingDayReducer from './setting-working-day/reducers';
import settingLeaveDeductionReducer from './setting-leave-deduction/reducers';
import settingBenefitReducer from './setting-benefit/reducers';
=======
import staffProofReducer from './staff-proof/reducers';
import staffQualificationReducer from './staff-qualification/reducers';
import staffLeaveReducer from './staff-leave/reducers';
>>>>>>> 0b032fb35f93fa6bab27cc88b3cddd8666938b81

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    departmentReducer,
    permissionReducer,
    settingReducer,
    designationReducer,
    staffReducer,
    roleReducer,
    loginReducer,
    uploadImagesReducer,
    petrolAllowanceReducer,
    transferStaffReducer,
    settingWorkingDayReducer,
    settingLeaveDeductionReducer,
    settingBenefitReducer,
    attendanceInchargeReducer,
    staffAdvanceReducer,
    deputationReducer,
    activityReducer,
    claimTypeReducer,
    claimReducer,
    branchReducer,
    proofTypeReducer,
    holidayReducer,
    staffProofReducer,
    staffQualificationReducer,
    staffLeaveReducer,
});
