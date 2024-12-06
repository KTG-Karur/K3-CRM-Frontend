// employee/reducers.ts
const initialState = {
  getSalaryIncreamentHistoryList: [],
  createSalaryIncreamentHistoryData: null,
  updateSalaryIncreamentHistoryData: null,
  isLoading: false,
  errorMessage: null,
  getSalaryIncreamentHistorySuccess: false,
  getSalaryIncreamentHistoryFailure: false,
  createSalaryIncreamentHistorySuccess: false,
  createSalaryIncreamentHistoryFailure: false,
  updateSalaryIncreamentHistorySuccess: false,
  updateSalaryIncreamentHistoryFailure: false,
  deleteSalaryIncreamentHistorySuccess: false,
  deleteSalaryIncreamentHistoryFailure: false,
};

export default function salaryIncreamentHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SALARY_INCREAMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        getSalaryIncreamentHistorySuccess: true,
        getSalaryIncreamentHistoryList: action.payload.data.data,
        getSalaryIncreamentHistoryFailure: false,
      };
    }
    case "GET_SALARY_INCREAMENT_HISTORY_FAILURE": {
      return {
        ...state,
        getSalaryIncreamentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSalaryIncreamentHistorySuccess: false,
      };
    }
    case "RESET_GET_SALARY_INCREAMENT_HISTORY": {
      return {
        ...state,
        getSalaryIncreamentHistorySuccess: false,
        getSalaryIncreamentHistoryFailure: false,
        getSalaryIncreamentHistoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SALARY_INCREAMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        createSalaryIncreamentHistorySuccess: true,
        createSalaryIncreamentHistoryData: action.payload.data.data,
        createSalaryIncreamentHistoryFailure: false,
      };
    }
    case "CREATE_SALARY_INCREAMENT_HISTORY_FAILURE": {
      return {
        ...state,
        createSalaryIncreamentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createSalaryIncreamentHistorySuccess: false,
      };
    }
    case "RESET_CREATE_SALARY_INCREAMENT_HISTORY": {
      return {
        ...state,
        createSalaryIncreamentHistorySuccess: false,
        createSalaryIncreamentHistoryFailure: false,
        createSalaryIncreamentHistoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SALARY_INCREAMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        updateSalaryIncreamentHistorySuccess: true,
        updateSalaryIncreamentHistoryData: action.payload.data.data,
        updateSalaryIncreamentHistoryFailure: false,
      };
    }
    case "UPDATE_SALARY_INCREAMENT_HISTORY_FAILURE": {
      return {
        ...state,
        updateSalaryIncreamentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateSalaryIncreamentHistorySuccess: false,
      };
    }
    case "RESET_UPDATE_SALARY_INCREAMENT_HISTORY": {
      return {
        ...state,
        updateSalaryIncreamentHistorySuccess: false,
        updateSalaryIncreamentHistoryFailure: false,
        updateSalaryIncreamentHistoryData: null,
        errorMessage: null,
      };
    }

    case "DELETE_SALARY_INCREAMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        deleteSalaryIncreamentHistorySuccess: true,
        deleteSalaryIncreamentHistoryFailure: false,
      };
    }
    case "DELETE_SALARY_INCREAMENT_HISTORY_FAILURE": {
      return {
        ...state,
        deleteSalaryIncreamentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteSalaryIncreamentHistorySuccess: false,
      };
    }
    case "RESET_DELETE_SALARY_INCREAMENT_HISTORY": {
      return {
        ...state,
        deleteSalaryIncreamentHistorySuccess: false,
        deleteSalaryIncreamentHistoryFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
