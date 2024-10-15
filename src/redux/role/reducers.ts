// employee/reducers.ts
const initialState = {
  getRoleList: [],
  createRoleData: null,
  updateRoleData: null,
  isLoading: false,
  errorMessage: null,
  getRoleSuccess: false,
  getRoleFailure: false,
  createRoleSuccess: false,
  createRoleFailure: false,
  updateRoleSuccess: false,
  updateRoleFailure: false,
  deleteRoleSuccess: false,
  deleteRoleFailure: false,
};

export default function roleReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ROLE_SUCCESS": {
      return {
        ...state,
        getRoleSuccess: true,
        getRoleList: action.payload.data.data,
        getRoleFailure: false,
      };
    }
    case "GET_ROLE_FAILURE": {
      return {
        ...state,
        getRoleFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getRoleSuccess: false,
      };
    }
    case "RESET_GET_ROLE": {
      return {
        ...state,
        getRoleSuccess: false,
        getRoleFailure: false,
        getRoleList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ROLE_SUCCESS": {
      return {
        ...state,
        createRoleSuccess: true,
        createRoleData: action.payload.data.data,
        createRoleFailure: false,
      };
    }
    case "CREATE_ROLE_FAILURE": {
      return {
        ...state,
        createRoleFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createRoleSuccess: false,
      };
    }
    case "RESET_CREATE_ROLE": {
      return {
        ...state,
        createRoleSuccess: false,
        createRoleFailure: false,
        createRoleData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ROLE_SUCCESS": {
      return {
        ...state,
        updateRoleSuccess: true,
        updateRoleData: action.payload.data.data,
        updateRoleFailure: false,
      };
    }
    case "UPDATE_ROLE_FAILURE": {
      return {
        ...state,
        updateRoleFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateRoleSuccess: false,
      };
    }
    case "RESET_UPDATE_ROLE": {
      return {
        ...state,
        updateRoleSuccess: false,
        updateRoleFailure: false,
        updateRoleData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_ROLE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteRoleSuccess: true,
    //     deleteRoleFailure: false,
    //   };
    // }
    // case "DELETE_ROLE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteRoleFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteRoleSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_ROLE": {
    //   return {
    //     ...state,
    //     deleteRoleSuccess: false,
    //     deleteRoleFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
