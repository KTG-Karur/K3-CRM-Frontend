// employee/reducers.ts
const initialState = {
  getStaffLanguageList: [],
  createStaffLanguageData: null,
  updateStaffLanguageData: null,
  isLoading: false,
  errorMessage: null,
  getStaffLanguageSuccess: false,
  getStaffLanguageFailure: false,
  createStaffLanguageSuccess: false,
  createStaffLanguageFailure: false,
  updateStaffLanguageSuccess: false,
  updateStaffLanguageFailure: false,
  deleteStaffLanguageSuccess: false,
  deleteStaffLanguageFailure: false,
};

export default function staffLanguageReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_LANGUAGE_SUCCESS": {
      return {
        ...state,
        getStaffLanguageSuccess: true,
        getStaffLanguageList: action.payload.data.data,
        getStaffLanguageFailure: false,
      };
    }
    case "GET_STAFF_LANGUAGE_FAILURE": {
      return {
        ...state,
        getStaffLanguageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffLanguageSuccess: false,
      };
    }
    case "RESET_GET_STAFF_LANGUAGE": {
      return {
        ...state,
        getStaffLanguageSuccess: false,
        getStaffLanguageFailure: false,
        getStaffLanguageList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_LANGUAGE_SUCCESS": {
      return {
        ...state,
        createStaffLanguageSuccess: true,
        createStaffLanguageData: action.payload.data.data,
        createStaffLanguageFailure: false,
      };
    }
    case "CREATE_STAFF_LANGUAGE_FAILURE": {
      return {
        ...state,
        createStaffLanguageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffLanguageSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_LANGUAGE": {
      return {
        ...state,
        createStaffLanguageSuccess: false,
        createStaffLanguageFailure: false,
        createStaffLanguageData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_LANGUAGE_SUCCESS": {
      return {
        ...state,
        updateStaffLanguageSuccess: true,
        updateStaffLanguageData: action.payload.data.data,
        updateStaffLanguageFailure: false,
      };
    }
    case "UPDATE_STAFF_LANGUAGE_FAILURE": {
      return {
        ...state,
        updateStaffLanguageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffLanguageSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_LANGUAGE": {
      return {
        ...state,
        updateStaffLanguageSuccess: false,
        updateStaffLanguageFailure: false,
        updateStaffLanguageData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_LANGUAGE_SUCCESS": {
      return {
        ...state,
        deleteStaffLanguageSuccess: true,
        deleteStaffLanguageFailure: false,
      };
    }
    case "DELETE_STAFF_LANGUAGE_FAILURE": {
      return {
        ...state,
        deleteStaffLanguageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffLanguageSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_LANGUAGE": {
      return {
        ...state,
        deleteStaffLanguageSuccess: false,
        deleteStaffLanguageFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
