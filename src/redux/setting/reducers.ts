// employee/reducers.ts
const initialState = {
  getSettingList: [],
  createSettingData: null,
  updateSettingData: null,
  isLoading: false,
  errorMessage: null,
  getSettingSuccess: false,
  getSettingFailure: false,
  createSettingSuccess: false,
  createSettingFailure: false,
  updateSettingSuccess: false,
  updateSettingFailure: false,
  deleteSettingSuccess: false,
  deleteSettingFailure: false,
};

export default function settingReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SETTING_SUCCESS": {
      return {
        ...state,
        getSettingSuccess: true,
        getSettingList: action.payload.data.data,
        getSettingFailure: false,
      };
    }
    case "GET_SETTING_FAILURE": {
      return {
        ...state,
        getSettingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSettingSuccess: false,
      };
    }
    case "RESET_GET_SETTING": {
      return {
        ...state,
        getSettingSuccess: false,
        getSettingFailure: false,
        getSettingList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SETTING_SUCCESS": {
      return {
        ...state,
        createSettingSuccess: true,
        createSettingData: action.payload.data.data,
        createSettingFailure: false,
      };
    }
    case "CREATE_SETTING_FAILURE": {
      return {
        ...state,
        createSettingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createSettingSuccess: false,
      };
    }
    case "RESET_CREATE_SETTING": {
      return {
        ...state,
        createSettingSuccess: false,
        createSettingFailure: false,
        createSettingData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SETTING_SUCCESS": {
      return {
        ...state,
        updateSettingSuccess: true,
        updateSettingData: action.payload.data.data,
        updateSettingFailure: false,
      };
    }
    case "UPDATE_SETTING_FAILURE": {
      return {
        ...state,
        updateSettingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateSettingSuccess: false,
      };
    }
    case "RESET_UPDATE_SETTING": {
      return {
        ...state,
        updateSettingSuccess: false,
        updateSettingFailure: false,
        updateSettingData: null,
        errorMessage: null,
      };
    }

    case "DELETE_SETTING_SUCCESS": {
      return {
        ...state,
        deleteSettingSuccess: true,
        deleteSettingFailure: false,
      };
    }
    case "DELETE_SETTING_FAILURE": {
      return {
        ...state,
        deleteSettingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteSettingSuccess: false,
      };
    }
    case "RESET_DELETE_SETTING": {
      return {
        ...state,
        deleteSettingSuccess: false,
        deleteSettingFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
