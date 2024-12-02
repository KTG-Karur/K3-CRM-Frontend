// employee/reducers.ts
const initialState = {
  getPermissionList: [],
  createPermissionData: null,
  updatePermissionData: null,
  isLoading: false,
  errorMessage: null,
  getPermissionSuccess: false,
  getPermissionFailure: false,
  createPermissionSuccess: false,
  createPermissionFailure: false,
  updatePermissionSuccess: false,
  updatePermissionFailure: false,
  deletePermissionSuccess: false,
  deletePermissionFailure: false,
};

export default function permissionReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_PERMISSION_SUCCESS": {
      return {
        ...state,
        getPermissionSuccess: true,
        getPermissionList: action.payload.data.data,
        getPermissionFailure: false,
      };
    }
    case "GET_PERMISSION_FAILURE": {
      return {
        ...state,
        getPermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getPermissionSuccess: false,
      };
    }
    case "RESET_GET_PERMISSION": {
      return {
        ...state,
        getPermissionSuccess: false,
        getPermissionFailure: false,
        getPermissionList: [],
        errorMessage: null,
      };
    }

    case "CREATE_PERMISSION_SUCCESS": {
      return {
        ...state,
        createPermissionSuccess: true,
        createPermissionData: action.payload.data.data,
        createPermissionFailure: false,
      };
    }
    case "CREATE_PERMISSION_FAILURE": {
      return {
        ...state,
        createPermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createPermissionSuccess: false,
      };
    }
    case "RESET_CREATE_PERMISSION": {
      return {
        ...state,
        createPermissionSuccess: false,
        createPermissionFailure: false,
        createPermissionData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_PERMISSION_SUCCESS": {
      return {
        ...state,
        updatePermissionSuccess: true,
        updatePermissionData: action.payload.data.data,
        updatePermissionFailure: false,
      };
    }
    case "UPDATE_PERMISSION_FAILURE": {
      return {
        ...state,
        updatePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updatePermissionSuccess: false,
      };
    }
    case "RESET_UPDATE_PERMISSION": {
      return {
        ...state,
        updatePermissionSuccess: false,
        updatePermissionFailure: false,
        updatePermissionData: null,
        errorMessage: null,
      };
    }

    case "DELETE_PERMISSION_SUCCESS": {
      return {
        ...state,
        deletePermissionSuccess: true,
        deletePermissionFailure: false,
      };
    }
    case "DELETE_PERMISSION_FAILURE": {
      return {
        ...state,
        deletePermissionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deletePermissionSuccess: false,
      };
    }
    case "RESET_DELETE_PERMISSION": {
      return {
        ...state,
        deletePermissionSuccess: false,
        deletePermissionFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
