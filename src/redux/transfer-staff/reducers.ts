// employee/reducers.ts
const initialState = {
  getTransferStaffList: [],
  createTransferStaffData: null,
  updateTransferStaffData: null,
  isLoading: false,
  errorMessage: null,
  getTransferStaffSuccess: false,
  getTransferStaffFailure: false,
  createTransferStaffSuccess: false,
  createTransferStaffFailure: false,
  updateTransferStaffSuccess: false,
  updateTransferStaffFailure: false,
  deleteTransferStaffSuccess: false,
  deleteTransferStaffFailure: false,
};

export default function transferStaffReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_TRANSFER_STAFF_SUCCESS": {
      return {
        ...state,
        getTransferStaffSuccess: true,
        getTransferStaffList: action.payload.data.data,
        getTransferStaffFailure: false,
      };
    }
    case "GET_TRANSFER_STAFF_FAILURE": {
      return {
        ...state,
        getTransferStaffFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getTransferStaffSuccess: false,
      };
    }
    case "RESET_GET_TRANSFER_STAFF": {
      return {
        ...state,
        getTransferStaffSuccess: false,
        getTransferStaffFailure: false,
        getTransferStaffList: [],
        errorMessage: null,
      };
    }

    case "CREATE_TRANSFER_STAFF_SUCCESS": {
      return {
        ...state,
        createTransferStaffSuccess: true,
        createTransferStaffData: action.payload.data.data,
        createTransferStaffFailure: false,
      };
    }
    case "CREATE_TRANSFER_STAFF_FAILURE": {
      return {
        ...state,
        createTransferStaffFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createTransferStaffSuccess: false,
      };
    }
    case "RESET_CREATE_TRANSFER_STAFF": {
      return {
        ...state,
        createTransferStaffSuccess: false,
        createTransferStaffFailure: false,
        createTransferStaffData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_TRANSFER_STAFF_SUCCESS": {
      return {
        ...state,
        updateTransferStaffSuccess: true,
        updateTransferStaffData: action.payload.data.data,
        updateTransferStaffFailure: false,
      };
    }
    case "UPDATE_TRANSFER_STAFF_FAILURE": {
      return {
        ...state,
        updateTransferStaffFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateTransferStaffSuccess: false,
      };
    }
    case "RESET_UPDATE_TRANSFER_STAFF": {
      return {
        ...state,
        updateTransferStaffSuccess: false,
        updateTransferStaffFailure: false,
        updateTransferStaffData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_TRANSFER_STAFF_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteTransferStaffSuccess: true,
    //     deleteTransferStaffFailure: false,
    //   };
    // }
    // case "DELETE_TRANSFER_STAFF_FAILURE": {
    //   return {
    //     ...state,
    //     deleteTransferStaffFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteTransferStaffSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_TRANSFER_STAFF": {
    //   return {
    //     ...state,
    //     deleteTransferStaffSuccess: false,
    //     deleteTransferStaffFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
