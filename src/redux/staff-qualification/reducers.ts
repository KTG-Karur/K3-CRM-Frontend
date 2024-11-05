// employee/reducers.ts
const initialState = {
  getStaffQualificationList: [],
  createStaffQualificationData: null,
  updateStaffQualificationData: null,
  isLoading: false,
  errorMessage: null,
  getStaffQualificationSuccess: false,
  getStaffQualificationFailure: false,
  createStaffQualificationSuccess: false,
  createStaffQualificationFailure: false,
  updateStaffQualificationSuccess: false,
  updateStaffQualificationFailure: false,
  deleteStaffQualificationSuccess: false,
  deleteStaffQualificationFailure: false,
};

export default function staffQualificationReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_QUALIFICATION_SUCCESS": {
      return {
        ...state,
        getStaffQualificationSuccess: true,
        getStaffQualificationList: action.payload.data.data,
        getStaffQualificationFailure: false,
      };
    }
    case "GET_STAFF_QUALIFICATION_FAILURE": {
      return {
        ...state,
        getStaffQualificationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffQualificationSuccess: false,
      };
    }
    case "RESET_GET_STAFF_QUALIFICATION": {
      return {
        ...state,
        getStaffQualificationSuccess: false,
        getStaffQualificationFailure: false,
        getStaffQualificationList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_QUALIFICATION_SUCCESS": {
      return {
        ...state,
        createStaffQualificationSuccess: true,
        createStaffQualificationData: action.payload.data.data,
        createStaffQualificationFailure: false,
      };
    }
    case "CREATE_STAFF_QUALIFICATION_FAILURE": {
      return {
        ...state,
        createStaffQualificationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffQualificationSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_QUALIFICATION": {
      return {
        ...state,
        createStaffQualificationSuccess: false,
        createStaffQualificationFailure: false,
        createStaffQualificationData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_QUALIFICATION_SUCCESS": {
      return {
        ...state,
        updateStaffQualificationSuccess: true,
        updateStaffQualificationData: action.payload.data.data,
        updateStaffQualificationFailure: false,
      };
    }
    case "UPDATE_STAFF_QUALIFICATION_FAILURE": {
      return {
        ...state,
        updateStaffQualificationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffQualificationSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_QUALIFICATION": {
      return {
        ...state,
        updateStaffQualificationSuccess: false,
        updateStaffQualificationFailure: false,
        updateStaffQualificationData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_QUALIFICATION_SUCCESS": {
      return {
        ...state,
        deleteStaffQualificationSuccess: true,
        deleteStaffQualificationFailure: false,
      };
    }
    case "DELETE_STAFF_QUALIFICATION_FAILURE": {
      return {
        ...state,
        deleteStaffQualificationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffQualificationSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_QUALIFICATION": {
      return {
        ...state,
        deleteStaffQualificationSuccess: false,
        deleteStaffQualificationFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
