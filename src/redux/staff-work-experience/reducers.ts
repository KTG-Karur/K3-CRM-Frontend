// employee/reducers.ts
const initialState = {
  getStaffWorkExperienceList: [],
  createStaffWorkExperienceData: null,
  updateStaffWorkExperienceData: null,
  isLoading: false,
  errorMessage: null,
  getStaffWorkExperienceSuccess: false,
  getStaffWorkExperienceFailure: false,
  createStaffWorkExperienceSuccess: false,
  createStaffWorkExperienceFailure: false,
  updateStaffWorkExperienceSuccess: false,
  updateStaffWorkExperienceFailure: false,
  deleteStaffWorkExperienceSuccess: false,
  deleteStaffWorkExperienceFailure: false,
};

export default function staffWorkExperienceReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_WORK_EXPERIENCE_SUCCESS": {
      return {
        ...state,
        getStaffWorkExperienceSuccess: true,
        getStaffWorkExperienceList: action.payload.data.data,
        getStaffWorkExperienceFailure: false,
      };
    }
    case "GET_STAFF_WORK_EXPERIENCE_FAILURE": {
      return {
        ...state,
        getStaffWorkExperienceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffWorkExperienceSuccess: false,
      };
    }
    case "RESET_GET_STAFF_WORK_EXPERIENCE": {
      return {
        ...state,
        getStaffWorkExperienceSuccess: false,
        getStaffWorkExperienceFailure: false,
        getStaffWorkExperienceList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_WORK_EXPERIENCE_SUCCESS": {
      return {
        ...state,
        createStaffWorkExperienceSuccess: true,
        createStaffWorkExperienceData: action.payload.data.data,
        createStaffWorkExperienceFailure: false,
      };
    }
    case "CREATE_STAFF_WORK_EXPERIENCE_FAILURE": {
      return {
        ...state,
        createStaffWorkExperienceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffWorkExperienceSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_WORK_EXPERIENCE": {
      return {
        ...state,
        createStaffWorkExperienceSuccess: false,
        createStaffWorkExperienceFailure: false,
        createStaffWorkExperienceData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_WORK_EXPERIENCE_SUCCESS": {
      return {
        ...state,
        updateStaffWorkExperienceSuccess: true,
        updateStaffWorkExperienceData: action.payload.data.data,
        updateStaffWorkExperienceFailure: false,
      };
    }
    case "UPDATE_STAFF_WORK_EXPERIENCE_FAILURE": {
      return {
        ...state,
        updateStaffWorkExperienceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffWorkExperienceSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_WORK_EXPERIENCE": {
      return {
        ...state,
        updateStaffWorkExperienceSuccess: false,
        updateStaffWorkExperienceFailure: false,
        updateStaffWorkExperienceData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_WORK_EXPERIENCE_SUCCESS": {
      return {
        ...state,
        deleteStaffWorkExperienceSuccess: true,
        deleteStaffWorkExperienceFailure: false,
      };
    }
    case "DELETE_STAFF_WORK_EXPERIENCE_FAILURE": {
      return {
        ...state,
        deleteStaffWorkExperienceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffWorkExperienceSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_WORK_EXPERIENCE": {
      return {
        ...state,
        deleteStaffWorkExperienceSuccess: false,
        deleteStaffWorkExperienceFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
