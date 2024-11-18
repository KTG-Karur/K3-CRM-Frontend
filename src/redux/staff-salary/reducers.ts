// employee/reducers.ts
const initialState = {
  getStaffSalaryList: [],
  createStaffSalaryData: null,
  updateStaffSalaryData: null,
  isLoading: false,
  errorMessage: null,
  getStaffSalarySuccess: false,
  getStaffSalaryFailure: false,
  createStaffSalarySuccess: false,
  createStaffSalaryFailure: false,
  updateStaffSalarySuccess: false,
  updateStaffSalaryFailure: false,
  deleteStaffSalarySuccess: false,
  deleteStaffSalaryFailure: false,
};

export default function staffsalaryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFFSALARY_SUCCESS": {
      return {
        ...state,
        getStaffSalarySuccess: true,
        getStaffSalaryList: action.payload.data.data,
        getStaffSalaryFailure: false,
      };
    }
    case "GET_STAFFSALARY_FAILURE": {
      return {
        ...state,
        getStaffSalaryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffSalarySuccess: false,
      };
    }
    case "RESET_GET_STAFFSALARY": {
      return {
        ...state,
        getStaffSalarySuccess: false,
        getStaffSalaryFailure: false,
        getStaffSalaryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFFSALARY_SUCCESS": {
      return {
        ...state,
        createStaffSalarySuccess: true,
        createStaffSalaryData: action.payload.data.data,
        createStaffSalaryFailure: false,
      };
    }
    case "CREATE_STAFFSALARY_FAILURE": {
      return {
        ...state,
        createStaffSalaryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffSalarySuccess: false,
      };
    }
    case "RESET_CREATE_STAFFSALARY": {
      return {
        ...state,
        createStaffSalarySuccess: false,
        createStaffSalaryFailure: false,
        createStaffSalaryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFFSALARY_SUCCESS": {
      return {
        ...state,
        updateStaffSalarySuccess: true,
        updateStaffSalaryData: action.payload.data.data,
        updateStaffSalaryFailure: false,
      };
    }
    case "UPDATE_STAFFSALARY_FAILURE": {
      return {
        ...state,
        updateStaffSalaryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffSalarySuccess: false,
      };
    }
    case "RESET_UPDATE_STAFFSALARY": {
      return {
        ...state,
        updateStaffSalarySuccess: false,
        updateStaffSalaryFailure: false,
        updateStaffSalaryData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFFSALARY_SUCCESS": {
      return {
        ...state,
        deleteStaffSalarySuccess: true,
        deleteStaffSalaryFailure: false,
      };
    }
    case "DELETE_STAFFSALARY_FAILURE": {
      return {
        ...state,
        deleteStaffSalaryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffSalarySuccess: false,
      };
    }
    case "RESET_DELETE_STAFFSALARY": {
      return {
        ...state,
        deleteStaffSalarySuccess: false,
        deleteStaffSalaryFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
