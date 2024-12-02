// employee/reducers.ts
const initialState = {
  getActivityList: [],
  createActivityData: null,
  updateActivityData: null,
  isLoading: false,
  errorMessage: null,
  getActivitySuccess: false,
  getActivityFailure: false,
  createActivitySuccess: false,
  createActivityFailure: false,
  updateActivitySuccess: false,
  updateActivityFailure: false,
  deleteActivitySuccess: false,
  deleteActivityFailure: false,
};

export default function activityReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ACTIVITY_SUCCESS": {
      return {
        ...state,
        getActivitySuccess: true,
        getActivityList: action.payload.data.data,
        getActivityFailure: false,
      };
    }
    case "GET_ACTIVITY_FAILURE": {
      return {
        ...state,
        getActivityFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getActivitySuccess: false,
      };
    }
    case "RESET_GET_ACTIVITY": {
      return {
        ...state,
        getActivitySuccess: false,
        getActivityFailure: false,
        getActivityList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ACTIVITY_SUCCESS": {
      return {
        ...state,
        createActivitySuccess: true,
        createActivityData: action.payload.data.data,
        createActivityFailure: false,
      };
    }
    case "CREATE_ACTIVITY_FAILURE": {
      return {
        ...state,
        createActivityFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createActivitySuccess: false,
      };
    }
    case "RESET_CREATE_ACTIVITY": {
      return {
        ...state,
        createActivitySuccess: false,
        createActivityFailure: false,
        createActivityData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ACTIVITY_SUCCESS": {
      return {
        ...state,
        updateActivitySuccess: true,
        updateActivityData: action.payload.data.data,
        updateActivityFailure: false,
      };
    }
    case "UPDATE_ACTIVITY_FAILURE": {
      return {
        ...state,
        updateActivityFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateActivitySuccess: false,
      };
    }
    case "RESET_UPDATE_ACTIVITY": {
      return {
        ...state,
        updateActivitySuccess: false,
        updateActivityFailure: false,
        updateActivityData: null,
        errorMessage: null,
      };
    }

    case "DELETE_ACTIVITY_SUCCESS": {
      return {
        ...state,
        deleteActivitySuccess: true,
        deleteActivityFailure: false,
      };
    }
    case "DELETE_ACTIVITY_FAILURE": {
      return {
        ...state,
        deleteActivityFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteActivitySuccess: false,
      };
    }
    case "RESET_DELETE_ACTIVITY": {
      return {
        ...state,
        deleteActivitySuccess: false,
        deleteActivityFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
