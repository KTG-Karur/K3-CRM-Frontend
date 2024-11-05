// employee/reducers.ts
const initialState = {
  getStaffLeaveList: [],
  createStaffLeaveData: null,
  updateStaffLeaveData: null,
  isLoading: false,
  errorMessage: null,
  getStaffLeaveSuccess: false,
  getStaffLeaveFailure: false,
  createStaffLeaveSuccess: false,
  createStaffLeaveFailure: false,
  updateStaffLeaveSuccess: false,
  updateStaffLeaveFailure: false,
  deleteStaffLeaveSuccess: false,
  deleteStaffLeaveFailure: false,
};

export default function staffLeaveReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_LEAVE_SUCCESS": {
      return {
        ...state,
        getStaffLeaveSuccess: true,
        getStaffLeaveList: action.payload.data.data,
        getStaffLeaveFailure: false,
      };
    }
    case "GET_STAFF_LEAVE_FAILURE": {
      return {
        ...state,
        getStaffLeaveFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffLeaveSuccess: false,
      };
    }
    case "RESET_GET_STAFF_LEAVE": {
      return {
        ...state,
        getStaffLeaveSuccess: false,
        getStaffLeaveFailure: false,
        getStaffLeaveList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_LEAVE_SUCCESS": {
      return {
        ...state,
        createStaffLeaveSuccess: true,
        createStaffLeaveData: action.payload.data.data,
        createStaffLeaveFailure: false,
      };
    }
    case "CREATE_STAFF_LEAVE_FAILURE": {
      return {
        ...state,
        createStaffLeaveFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffLeaveSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_LEAVE": {
      return {
        ...state,
        createStaffLeaveSuccess: false,
        createStaffLeaveFailure: false,
        createStaffLeaveData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_LEAVE_SUCCESS": {
      return {
        ...state,
        updateStaffLeaveSuccess: true,
        updateStaffLeaveData: action.payload.data.data,
        updateStaffLeaveFailure: false,
      };
    }
    case "UPDATE_STAFF_LEAVE_FAILURE": {
      return {
        ...state,
        updateStaffLeaveFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffLeaveSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_LEAVE": {
      return {
        ...state,
        updateStaffLeaveSuccess: false,
        updateStaffLeaveFailure: false,
        updateStaffLeaveData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STAFF_LEAVE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStaffLeaveSuccess: true,
    //     deleteStaffLeaveFailure: false,
    //   };
    // }
    // case "DELETE_STAFF_LEAVE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStaffLeaveFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteStaffLeaveSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STAFF_LEAVE": {
    //   return {
    //     ...state,
    //     deleteStaffLeaveSuccess: false,
    //     deleteStaffLeaveFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
