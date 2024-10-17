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
});
