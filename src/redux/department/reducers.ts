// employee/reducers.ts
const initialState = {
  getDepartmentList: [],
  createDepartmentData: null,
  updateDepartmentData: null,
  isLoading: false,
  errorMessage: null,
  getDepartmentSuccess: false,
  getDepartmentFailure: false,
  createDepartmentSuccess: false,
  createDepartmentFailure: false,
  updateDepartmentSuccess: false,
  updateDepartmentFailure: false,
  deleteDepartmentSuccess: false,
  deleteDepartmentFailure: false,
};

export default function departmentReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        getDepartmentSuccess: true,
        getDepartmentList: action.payload.data.data,
        getDepartmentFailure: false,
      };
    }
    case "GET_DEPARTMENT_FAILURE": {
      return {
        ...state,
        getDepartmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDepartmentSuccess: false,
      };
    }
    case "RESET_GET_DEPARTMENT": {
      return {
        ...state,
        getDepartmentSuccess: false,
        getDepartmentFailure: false,
        getDepartmentList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        createDepartmentSuccess: true,
        createDepartmentData: action.payload.data.data,
        createDepartmentFailure: false,
      };
    }
    case "CREATE_DEPARTMENT_FAILURE": {
      return {
        ...state,
        createDepartmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDepartmentSuccess: false,
      };
    }
    case "RESET_CREATE_DEPARTMENT": {
      return {
        ...state,
        createDepartmentSuccess: false,
        createDepartmentFailure: false,
        createDepartmentData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        updateDepartmentSuccess: true,
        updateDepartmentData: action.payload.data.data,
        updateDepartmentFailure: false,
      };
    }
    case "UPDATE_DEPARTMENT_FAILURE": {
      return {
        ...state,
        updateDepartmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDepartmentSuccess: false,
      };
    }
    case "RESET_UPDATE_DEPARTMENT": {
      return {
        ...state,
        updateDepartmentSuccess: false,
        updateDepartmentFailure: false,
        updateDepartmentData: null,
        errorMessage: null,
      };
    }

    case "DELETE_DEPARTMENT_SUCCESS": {
      return {
        ...state,
        deleteDepartmentSuccess: true,
        deleteDepartmentFailure: false,
      };
    }
    case "DELETE_DEPARTMENT_FAILURE": {
      return {
        ...state,
        deleteDepartmentFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteDepartmentSuccess: false,
      };
    }
    case "RESET_DELETE_DEPARTMENT": {
      return {
        ...state,
        deleteDepartmentSuccess: false,
        deleteDepartmentFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
