// employee/reducers.ts
const initialState = {
  getSettingBenefitList: [],
  createSettingBenefitData: null,
  updateSettingBenefitData: null,
  isLoading: false,
  errorMessage: null,
  getSettingBenefitSuccess: false,
  getSettingBenefitFailure: false,
  createSettingBenefitSuccess: false,
  createSettingBenefitFailure: false,
  updateSettingBenefitSuccess: false,
  updateSettingBenefitFailure: false,
  deleteSettingBenefitSuccess: false,
  deleteSettingBenefitFailure: false,
};

export default function settingBenefitReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_SETTING_BENEFIT_SUCCESS": {
      return {
        ...state,
        getSettingBenefitSuccess: true,
        getSettingBenefitList: action.payload.data.data,
        getSettingBenefitFailure: false,
      };
    }
    case "GET_SETTING_BENEFIT_FAILURE": {
      return {
        ...state,
        getSettingBenefitFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getSettingBenefitSuccess: false,
      };
    }
    case "RESET_GET_SETTING_BENEFIT": {
      return {
        ...state,
        getSettingBenefitSuccess: false,
        getSettingBenefitFailure: false,
        getSettingBenefitList: [],
        errorMessage: null,
      };
    }

    case "CREATE_SETTING_BENEFIT_SUCCESS": {
      return {
        ...state,
        createSettingBenefitSuccess: true,
        createSettingBenefitData: action.payload.data.data,
        createSettingBenefitFailure: false,
      };
    }
    case "CREATE_SETTING_BENEFIT_FAILURE": {
      return {
        ...state,
        createSettingBenefitFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createSettingBenefitSuccess: false,
      };
    }
    case "RESET_CREATE_SETTING_BENEFIT": {
      return {
        ...state,
        createSettingBenefitSuccess: false,
        createSettingBenefitFailure: false,
        createSettingBenefitData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_SETTING_BENEFIT_SUCCESS": {
      return {
        ...state,
        updateSettingBenefitSuccess: true,
        updateSettingBenefitData: action.payload.data.data,
        updateSettingBenefitFailure: false,
      };
    }
    case "UPDATE_SETTING_BENEFIT_FAILURE": {
      return {
        ...state,
        updateSettingBenefitFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateSettingBenefitSuccess: false,
      };
    }
    case "RESET_UPDATE_SETTING_BENEFIT": {
      return {
        ...state,
        updateSettingBenefitSuccess: false,
        updateSettingBenefitFailure: false,
        updateSettingBenefitData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_SETTING_BENEFIT_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteSettingBenefitSuccess: true,
    //     deleteSettingBenefitFailure: false,
    //   };
    // }
    // case "DELETE_SETTING_BENEFIT_FAILURE": {
    //   return {
    //     ...state,
    //     deleteSettingBenefitFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteSettingBenefitSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_SETTING_BENEFIT": {
    //   return {
    //     ...state,
    //     deleteSettingBenefitSuccess: false,
    //     deleteSettingBenefitFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
