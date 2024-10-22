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

export default combineReducers({
    Auth,
    Layout,
    PageTitle,
    departmentReducer,
    designationReducer,
    staffReducer,
    roleReducer,
    loginReducer,
    uploadImagesReducer,
    petrolAllowanceReducer,
    transferStaffReducer,
    staffAdvanceReducer,
    deputationReducer,
    activityReducer,
    claimTypeReducer,
    claimReducer,
    branchReducer,
    proofTypeReducer,
    holidayReducer,
});
