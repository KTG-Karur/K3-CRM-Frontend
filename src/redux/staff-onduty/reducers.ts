// employee/reducers.ts
const initialState = {
  getStaffOnDutyList: [],
  createStaffOnDutyData: null,
  updateStaffOnDutyData: null,
  isLoading: false,
  errorMessage: null,
  getStaffOnDutySuccess: false,
  getStaffOnDutyFailure: false,
  createStaffOnDutySuccess: false,
  createStaffOnDutyFailure: false,
  updateStaffOnDutySuccess: false,
  updateStaffOnDutyFailure: false,
  deleteStaffOnDutySuccess: false,
  deleteStaffOnDutyFailure: false,
};

export default function staffOnDutyReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_ON_DUTY_SUCCESS": {
      return {
        ...state,
        getStaffOnDutySuccess: true,
        getStaffOnDutyList: action.payload.data.data,
        getStaffOnDutyFailure: false,
      };
    }
    case "GET_STAFF_ON_DUTY_FAILURE": {
      return {
        ...state,
        getStaffOnDutyFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffOnDutySuccess: false,
      };
    }
    case "RESET_GET_STAFF_ON_DUTY": {
      return {
        ...state,
        getStaffOnDutySuccess: false,
        getStaffOnDutyFailure: false,
        getStaffOnDutyList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_ON_DUTY_SUCCESS": {
      return {
        ...state,
        createStaffOnDutySuccess: true,
        createStaffOnDutyData: action.payload.data.data,
        createStaffOnDutyFailure: false,
      };
    }
    case "CREATE_STAFF_ON_DUTY_FAILURE": {
      return {
        ...state,
        createStaffOnDutyFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffOnDutySuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_ON_DUTY": {
      return {
        ...state,
        createStaffOnDutySuccess: false,
        createStaffOnDutyFailure: false,
        createStaffOnDutyData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_ON_DUTY_SUCCESS": {
      return {
        ...state,
        updateStaffOnDutySuccess: true,
        updateStaffOnDutyData: action.payload.data.data,
        updateStaffOnDutyFailure: false,
      };
    }
    case "UPDATE_STAFF_ON_DUTY_FAILURE": {
      return {
        ...state,
        updateStaffOnDutyFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffOnDutySuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_ON_DUTY": {
      return {
        ...state,
        updateStaffOnDutySuccess: false,
        updateStaffOnDutyFailure: false,
        updateStaffOnDutyData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STAFF_ON_DUTY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStaffOnDutySuccess: true,
    //     deleteStaffOnDutyFailure: false,
    //   };
    // }
    // case "DELETE_STAFF_ON_DUTY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStaffOnDutyFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteStaffOnDutySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STAFF_ON_DUTY": {
    //   return {
    //     ...state,
    //     deleteStaffOnDutySuccess: false,
    //     deleteStaffOnDutyFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
