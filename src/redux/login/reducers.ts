// employee/reducers.ts
const initialState = {
  getEmployeeLoginList: [],
  isLoading: false,
  errorMessage: null,
  getEmployeeLoginSuccess: false,
  getEmployeeLoginFailure: false,
};

export default function loginReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_EMPLOYEE_LOGIN_SUCCESS": {
      return {
        ...state,
        getEmployeeLoginSuccess: true,
        getEmployeeLoginList: action.payload.data.data,
        getEmployeeLoginFailure: false,
      };
    }
    case "GET_EMPLOYEE_LOGIN_FAILURE": {
      return {
        ...state,
        getEmployeeLoginFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getEmployeeLoginSuccess: false,
      };
    }
    case "RESET_GET_EMPLOYEE_LOGIN": {
      return {
        ...state,
        getEmployeeLoginSuccess: false,
        getEmployeeLoginFailure: false,
        getEmployeeLoginList: [],
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
