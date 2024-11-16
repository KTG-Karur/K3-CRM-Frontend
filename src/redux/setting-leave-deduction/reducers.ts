// employee/reducers.ts
const initialState = {
  getSettingLeaveDeductionList: [],
  createSettingLeaveDeductionData: null,
  updateSettingLeaveDeductionData: null,
  isLoading: false,
  errorMessage: null,
  getSettingLeaveDeductionSuccess: false,
  getSettingLeaveDeductionFailure: false,
  createSettingLeaveDeductionSuccess: false,
  createSettingLeaveDeductionFailure: false,
  updateSettingLeaveDeductionSuccess: false,
  updateSettingLeaveDeductionFailure: false,
  deleteSettingLeaveDeductionSuccess: false,
  deleteSettingLeaveDeductionFailure: false,
};

export default function settingLeaveDeductionReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SETTING_LEAVE_DEDUCTION_SUCCESS": {
      return {
        ...state,
        getSettingLeaveDeductionSuccess: true,
        getSettingLeaveDeductionList: action.payload.data.data,
        getSettingLeaveDeductionFailure: false,
      };
    }
    case "GET_SETTING_LEAVE_DEDUCTION_FAILURE": {
      return {
        ...state,
        getSettingLeaveDeductionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSettingLeaveDeductionSuccess: false,
      };
    }
    case "RESET_GET_SETTING_LEAVE_DEDUCTION": {
      return {
        ...state,
        getSettingLeaveDeductionSuccess: false,
        getSettingLeaveDeductionFailure: false,
        getSettingLeaveDeductionList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SETTING_LEAVE_DEDUCTION_SUCCESS": {
      return {
        ...state,
        createSettingLeaveDeductionSuccess: true,
        createSettingLeaveDeductionData: action.payload.data.data,
        createSettingLeaveDeductionFailure: false,
      };
    }
    case "CREATE_SETTING_LEAVE_DEDUCTION_FAILURE": {
      return {
        ...state,
        createSettingLeaveDeductionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createSettingLeaveDeductionSuccess: false,
      };
    }
    case "RESET_CREATE_SETTING_LEAVE_DEDUCTION": {
      return {
        ...state,
        createSettingLeaveDeductionSuccess: false,
        createSettingLeaveDeductionFailure: false,
        createSettingLeaveDeductionData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SETTING_LEAVE_DEDUCTION_SUCCESS": {
      return {
        ...state,
        updateSettingLeaveDeductionSuccess: true,
        updateSettingLeaveDeductionData: action.payload.data.data,
        updateSettingLeaveDeductionFailure: false,
      };
    }
    case "UPDATE_SETTING_LEAVE_DEDUCTION_FAILURE": {
      return {
        ...state,
        updateSettingLeaveDeductionFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateSettingLeaveDeductionSuccess: false,
      };
    }
    case "RESET_UPDATE_SETTING_LEAVE_DEDUCTION": {
      return {
        ...state,
        updateSettingLeaveDeductionSuccess: false,
        updateSettingLeaveDeductionFailure: false,
        updateSettingLeaveDeductionData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_SETTING_LEAVE_DEDUCTION_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteSettingLeaveDeductionSuccess: true,
    //     deleteSettingLeaveDeductionFailure: false,
    //   };
    // }
    // case "DELETE_SETTING_LEAVE_DEDUCTION_FAILURE": {
    //   return {
    //     ...state,
    //     deleteSettingLeaveDeductionFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteSettingLeaveDeductionSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_SETTING_LEAVE_DEDUCTION": {
    //   return {
    //     ...state,
    //     deleteSettingLeaveDeductionSuccess: false,
    //     deleteSettingLeaveDeductionFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
