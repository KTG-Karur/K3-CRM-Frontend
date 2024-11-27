// employee/reducers.ts
const initialState = {
    getStaffList: [],
    getUserRightsData: [],
    createStaffData: null,
    createUserRightsData: null,
    updateStaffData: null,
    isLoading: false,
    errorMessage: null,

    getUserRightsSuccess: false,
    getUserRightsFailure: false,

    createUserRightsSuccess: false,
    createUserRightsFailure: false,

    getStaffSuccess: false,
    getStaffFailure: false,

    createStaffSuccess: false,
    createStaffFailure: false,

    updateStaffSuccess: false,
    updateStaffFailure: false,

    deleteStaffSuccess: false,
    deleteStaffFailure: false,
};

export default function staffReducer(state = initialState, action: any) {
    switch (action.type) {

        case 'CREATE_USER_RIGHTS_SUCCESS': {
            return {
                ...state,
                createUserRightsSuccess: true,
                createUserRightsData: action.payload?.data?.data?.data,
                getEmployeeMetaMessage: action.payload?.data?.data?.meta?.message,
                createUserRightsFailure: false,
            };
        }
        case 'CREATE_USER_RIGHTS_FAILURE': {
            return {
                ...state,
                createUserRightsFailure: true,
                getEmployeeMetaMessage: action.payload?.data?.data?.meta?.message,
                createUserRightsSuccess: false,
            };
        }
        case 'RESET_CREATE_USER_RIGHTS': {
            return {
                ...state,
                createUserRightsSuccess: false,
                createUserRightsFailure: false,
                createUserRightsData: null,
                getEmployeeMetaMessage: null,
            };
        }
        case 'GET_USER_RIGHTS_SUCCESS': {
            return {
                ...state,
                getUserRightsSuccess: true,
                getUserRightsData: action.payload?.data?.data,
                getUserRightsFailure: false,
            };
        }
        case 'GET_USER_RIGHTS_FAILURE': {
            return {
                ...state,
                getUserRightsFailure: true,
                getEmployeeMetaMessage: action.payload?.data?.data?.meta?.message,
                getUserRightsSuccess: false,
            };
        }
        case 'RESET_GET_USER_RIGHTS': {
            return {
                ...state,
                getUserRightsSuccess: false,
                getUserRightsFailure: false,
                getUserRightsData: [],
                getEmployeeMetaMessage: null,
            };
        }


        default: {
            return state;
        }
    }
}
