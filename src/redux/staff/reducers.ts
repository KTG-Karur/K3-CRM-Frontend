// employee/reducers.ts
const initialState = {
    getStaffList: [],
    createStaffData: null,
    updateStaffData: null,
    deleteStaffData: null,
    isLoading: false,
    errorMessage: null,
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
        case 'GET_STAFF_SUCCESS': {
            return {
                ...state,
                getStaffSuccess: true,
                getStaffList: action.payload.data.data,
                getStaffFailure: false,
            };
        }
        case 'GET_STAFF_FAILURE': {
            return {
                ...state,
                getStaffFailure: true,
                errorMessage: action.errorMessage.errorMessage,
                getStaffSuccess: false,
            };
        }
        case 'RESET_GET_STAFF': {
            return {
                ...state,
                getStaffSuccess: false,
                getStaffFailure: false,
                getStaffList: [],
                errorMessage: null,
            };
        }

        case 'GET_STAFF_DETAILS_SUCCESS': {
            return {
                ...state,
                getStaffDetailsSuccess: true,
                getStaffDetailsList: action.payload.data.data,
                getStaffDetailsFailure: false,
            };
        }
        case 'GET_STAFF_DETAILS_FAILURE': {
            return {
                ...state,
                getStaffDetailsFailure: true,
                errorMessage: action.errorMessage.errorMessage,
                getStaffDetailsSuccess: false,
            };
        }
        case 'RESET_GET_STAFF_DETAILS': {
            return {
                ...state,
                getStaffDetailsSuccess: false,
                getStaffDetailsFailure: false,
                getStaffDetailsList: [],
                errorMessage: null,
            };
        }

        case 'CREATE_STAFF_SUCCESS': {
            return {
                ...state,
                createStaffSuccess: true,
                createStaffData: action.payload.data.data,
                createStaffFailure: false,
            };
        }
        case 'CREATE_STAFF_FAILURE': {
            return {
                ...state,
                createStaffFailure: true,
                errorMessage: action.errorMessage.errorMessage,
                createStaffSuccess: false,
            };
        }
        case 'RESET_CREATE_STAFF': {
            return {
                ...state,
                createStaffSuccess: false,
                createStaffFailure: false,
                createStaffData: null,
                errorMessage: null,
            };
        }

        case 'UPDATE_STAFF_SUCCESS': {
            return {
                ...state,
                updateStaffSuccess: true,
                updateStaffData: action.payload.data.data,
                updateStaffFailure: false,
            };
        }
        case 'UPDATE_STAFF_FAILURE': {
            return {
                ...state,
                updateStaffFailure: true,
                errorMessage: action.errorMessage.errorMessage,
                updateStaffSuccess: false,
            };
        }
        case 'RESET_UPDATE_STAFF': {
            return {
                ...state,
                updateStaffSuccess: false,
                updateStaffFailure: false,
                updateStaffData: null,
                errorMessage: null,
            };
        }

        case 'DELETE_STAFF_SUCCESS': {
            return {
                ...state,
                deleteStaffSuccess: true,
                deleteStaffData: action.payload.data.data,
                deleteStaffFailure: false,
            };
        }
        case 'DELETE_STAFF_FAILURE': {
            return {
                ...state,
                deleteStaffFailure: true,
                errorMessage: action.errorMessage.errorMessage,
                deleteStaffSuccess: false,
            };
        }
        case 'RESET_DELETE_STAFF': {
            return {
                ...state,
                deleteStaffSuccess: false,
                deleteStaffFailure: false,
                deleteStaffData: null,
                errorMessage: null,
            };
        }

        default: {
            return state;
        }
    }
}
