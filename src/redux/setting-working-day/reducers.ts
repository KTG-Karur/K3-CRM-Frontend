// employee/reducers.ts
const initialState = {
  getSettingWorkingDayList: [],
  createSettingWorkingDayData: null,
  updateSettingWorkingDayData: null,
  isLoading: false,
  errorMessage: null,
  getSettingWorkingDaySuccess: false,
  getSettingWorkingDayFailure: false,
  createSettingWorkingDaySuccess: false,
  createSettingWorkingDayFailure: false,
  updateSettingWorkingDaySuccess: false,
  updateSettingWorkingDayFailure: false,
  deleteSettingWorkingDaySuccess: false,
  deleteSettingWorkingDayFailure: false,
};

export default function settingWorkingDayReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SETTING_WORKING_DAY_SUCCESS": {
      return {
        ...state,
        getSettingWorkingDaySuccess: true,
        getSettingWorkingDayList: action.payload.data.data,
        getSettingWorkingDayFailure: false,
      };
    }
    case "GET_SETTING_WORKING_DAY_FAILURE": {
      return {
        ...state,
        getSettingWorkingDayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSettingWorkingDaySuccess: false,
      };
    }
    case "RESET_GET_SETTING_WORKING_DAY": {
      return {
        ...state,
        getSettingWorkingDaySuccess: false,
        getSettingWorkingDayFailure: false,
        getSettingWorkingDayList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SETTING_WORKING_DAY_SUCCESS": {
      return {
        ...state,
        createSettingWorkingDaySuccess: true,
        createSettingWorkingDayData: action.payload.data.data,
        createSettingWorkingDayFailure: false,
      };
    }
    case "CREATE_SETTING_WORKING_DAY_FAILURE": {
      return {
        ...state,
        createSettingWorkingDayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createSettingWorkingDaySuccess: false,
      };
    }
    case "RESET_CREATE_SETTING_WORKING_DAY": {
      return {
        ...state,
        createSettingWorkingDaySuccess: false,
        createSettingWorkingDayFailure: false,
        createSettingWorkingDayData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SETTING_WORKING_DAY_SUCCESS": {
      return {
        ...state,
        updateSettingWorkingDaySuccess: true,
        updateSettingWorkingDayData: action.payload.data.data,
        updateSettingWorkingDayFailure: false,
      };
    }
    case "UPDATE_SETTING_WORKING_DAY_FAILURE": {
      return {
        ...state,
        updateSettingWorkingDayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateSettingWorkingDaySuccess: false,
      };
    }
    case "RESET_UPDATE_SETTING_WORKING_DAY": {
      return {
        ...state,
        updateSettingWorkingDaySuccess: false,
        updateSettingWorkingDayFailure: false,
        updateSettingWorkingDayData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_SETTING_WORKING_DAY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteSettingWorkingDaySuccess: true,
    //     deleteSettingWorkingDayFailure: false,
    //   };
    // }
    // case "DELETE_SETTING_WORKING_DAY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteSettingWorkingDayFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteSettingWorkingDaySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_SETTING_WORKING_DAY": {
    //   return {
    //     ...state,
    //     deleteSettingWorkingDaySuccess: false,
    //     deleteSettingWorkingDayFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
