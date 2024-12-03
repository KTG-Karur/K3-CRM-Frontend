// employee/reducers.ts
const initialState = {
  getRolePermissionList: [],
  createRolePermissionData: null,
  updateRolePermissionData: null,
  isLoading: false,
  errorMessage: null,
  getRolePermissionSuccess: false,
  getRolePermissionFailure: false,
  createRolePermissionSuccess: false,
  createRolePermissionFailure: false,
  updateRolePermissionSuccess: false,
  updateRolePermissionFailure: false,
  deleteRolePermissionSuccess: false,
  deleteRolePermissionFailure: false,
};

export default function rolePermissionReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ROLE_PERMISSION_SUCCESS": {
      return {
        ...state,
        getRolePermissionSuccess: true,
        getRolePermissionList: action.payload.data.data,
        getRolePermissionFailure: false,
      };
    }
    case "GET_ROLE_PERMISSION_FAILURE": {
      return {
        ...state,
        getRolePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getRolePermissionSuccess: false,
      };
    }
    case "RESET_GET_ROLE_PERMISSION": {
      return {
        ...state,
        getRolePermissionSuccess: false,
        getRolePermissionFailure: false,
        getRolePermissionList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ROLE_PERMISSION_SUCCESS": {
      return {
        ...state,
        createRolePermissionSuccess: true,
        createRolePermissionData: action.payload.data.data,
        createRolePermissionFailure: false,
      };
    }
    case "CREATE_ROLE_PERMISSION_FAILURE": {
      return {
        ...state,
        createRolePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createRolePermissionSuccess: false,
      };
    }
    case "RESET_CREATE_ROLE_PERMISSION": {
      return {
        ...state,
        createRolePermissionSuccess: false,
        createRolePermissionFailure: false,
        createRolePermissionData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ROLE_PERMISSION_SUCCESS": {
      return {
        ...state,
        updateRolePermissionSuccess: true,
        updateRolePermissionData: action.payload.data.data,
        updateRolePermissionFailure: false,
      };
    }
    case "UPDATE_ROLE_PERMISSION_FAILURE": {
      return {
        ...state,
        updateRolePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateRolePermissionSuccess: false,
      };
    }
    case "RESET_UPDATE_ROLE_PERMISSION": {
      return {
        ...state,
        updateRolePermissionSuccess: false,
        updateRolePermissionFailure: false,
        updateRolePermissionData: null,
        errorMessage: null,
      };
    }

    case "DELETE_ROLE_PERMISSION_SUCCESS": {
      return {
        ...state,
        deleteRolePermissionSuccess: true,
        deleteRolePermissionFailure: false,
      };
    }
    case "DELETE_ROLE_PERMISSION_FAILURE": {
      return {
        ...state,
        deleteRolePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteRolePermissionSuccess: false,
      };
    }
    case "RESET_DELETE_ROLE_PERMISSION": {
      return {
        ...state,
        deleteRolePermissionSuccess: false,
        deleteRolePermissionFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
