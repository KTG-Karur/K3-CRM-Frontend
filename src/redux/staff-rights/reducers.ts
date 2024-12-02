// employee/reducers.ts
const initialState = {
  getStaffRightsData: [],
  createStaffRightsData: null,
  updateStaffRightsData: null,
  isLoading: false,
  errorMessage: null,
  getStaffRightsSuccess: false,
  getStaffRightsFailure: false,
  createStaffRightsSuccess: false,
  createStaffRightsFailure: false,
  updateStaffRightsSuccess: false,
  updateStaffRightsFailure: false,
  deleteStaffRightsSuccess: false,
  deleteStaffRightsFailure: false,
};

export default function staffRightsReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_RIGHTS_SUCCESS": {
      return {
        ...state,
        getStaffRightsSuccess: true,
        getStaffRightsData: action.payload.data.data,
        getStaffRightsFailure: false,
      };
    }
    case "GET_STAFF_RIGHTS_FAILURE": {
      return {
        ...state,
        getStaffRightsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffRightsSuccess: false,
      };
    }
    case "RESET_GET_STAFF_RIGHTS": {
      return {
        ...state,
        getStaffRightsSuccess: false,
        getStaffRightsFailure: false,
        getStaffRightsData: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_RIGHTS_SUCCESS": {
      return {
        ...state,
        createStaffRightsSuccess: true,
        createStaffRightsData: action.payload.data.data,
        createStaffRightsFailure: false,
      };
    }
    case "CREATE_STAFF_RIGHTS_FAILURE": {
      return {
        ...state,
        createStaffRightsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffRightsSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_RIGHTS": {
      return {
        ...state,
        createStaffRightsSuccess: false,
        createStaffRightsFailure: false,
        createStaffRightsData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_RIGHTS_SUCCESS": {
      return {
        ...state,
        updateStaffRightsSuccess: true,
        updateStaffRightsData: action.payload.data.data,
        updateStaffRightsFailure: false,
      };
    }
    case "UPDATE_STAFF_RIGHTS_FAILURE": {
      return {
        ...state,
        updateStaffRightsFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffRightsSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_RIGHTS": {
      return {
        ...state,
        updateStaffRightsSuccess: false,
        updateStaffRightsFailure: false,
        updateStaffRightsData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STAFF_RIGHTS_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStaffRightsSuccess: true,
    //     deleteStaffRightsFailure: false,
    //   };
    // }
    // case "DELETE_STAFF_RIGHTS_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStaffRightsFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteStaffRightsSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STAFF_RIGHTS": {
    //   return {
    //     ...state,
    //     deleteStaffRightsSuccess: false,
    //     deleteStaffRightsFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
