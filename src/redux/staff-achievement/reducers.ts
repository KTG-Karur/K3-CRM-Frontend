// employee/reducers.ts
const initialState = {
  getStaffAchievementList: [],
  createStaffAchievementData: null,
  updateStaffAchievementData: null,
  isLoading: false,
  errorMessage: null,
  getStaffAchievementSuccess: false,
  getStaffAchievementFailure: false,
  createStaffAchievementSuccess: false,
  createStaffAchievementFailure: false,
  updateStaffAchievementSuccess: false,
  updateStaffAchievementFailure: false,
  deleteStaffAchievementSuccess: false,
  deleteStaffAchievementFailure: false,
};

export default function staffAchievementReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_ACHIEVEMENT_SUCCESS": {
      return {
        ...state,
        getStaffAchievementSuccess: true,
        getStaffAchievementList: action.payload.data.data,
        getStaffAchievementFailure: false,
      };
    }
    case "GET_STAFF_ACHIEVEMENT_FAILURE": {
      return {
        ...state,
        getStaffAchievementFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffAchievementSuccess: false,
      };
    }
    case "RESET_GET_STAFF_ACHIEVEMENT": {
      return {
        ...state,
        getStaffAchievementSuccess: false,
        getStaffAchievementFailure: false,
        getStaffAchievementList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_ACHIEVEMENT_SUCCESS": {
      return {
        ...state,
        createStaffAchievementSuccess: true,
        createStaffAchievementData: action.payload.data.data,
        createStaffAchievementFailure: false,
      };
    }
    case "CREATE_STAFF_ACHIEVEMENT_FAILURE": {
      return {
        ...state,
        createStaffAchievementFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffAchievementSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_ACHIEVEMENT": {
      return {
        ...state,
        createStaffAchievementSuccess: false,
        createStaffAchievementFailure: false,
        createStaffAchievementData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_ACHIEVEMENT_SUCCESS": {
      return {
        ...state,
        updateStaffAchievementSuccess: true,
        updateStaffAchievementData: action.payload.data.data,
        updateStaffAchievementFailure: false,
      };
    }
    case "UPDATE_STAFF_ACHIEVEMENT_FAILURE": {
      return {
        ...state,
        updateStaffAchievementFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffAchievementSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_ACHIEVEMENT": {
      return {
        ...state,
        updateStaffAchievementSuccess: false,
        updateStaffAchievementFailure: false,
        updateStaffAchievementData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_ACHIEVEMENT_SUCCESS": {
      return {
        ...state,
        deleteStaffAchievementSuccess: true,
        deleteStaffAchievementFailure: false,
      };
    }
    case "DELETE_STAFF_ACHIEVEMENT_FAILURE": {
      return {
        ...state,
        deleteStaffAchievementFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffAchievementSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_ACHIEVEMENT": {
      return {
        ...state,
        deleteStaffAchievementSuccess: false,
        deleteStaffAchievementFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
