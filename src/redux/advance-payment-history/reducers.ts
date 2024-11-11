// employee/reducers.ts
const initialState = {
  getAdvancePaymentHistoryList: [],
  createAdvancePaymentHistoryData: null,
  updateAdvancePaymentHistoryData: null,
  isLoading: false,
  errorMessage: null,
  getAdvancePaymentHistorySuccess: false,
  getAdvancePaymentHistoryFailure: false,
  createAdvancePaymentHistorySuccess: false,
  createAdvancePaymentHistoryFailure: false,
  updateAdvancePaymentHistorySuccess: false,
  updateAdvancePaymentHistoryFailure: false,
  deleteAdvancePaymentHistorySuccess: false,
  deleteAdvancePaymentHistoryFailure: false,
};

export default function advancePaymentHistoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ADVANCE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        getAdvancePaymentHistorySuccess: true,
        getAdvancePaymentHistoryList: action.payload.data.data,
        getAdvancePaymentHistoryFailure: false,
      };
    }
    case "GET_ADVANCE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        getAdvancePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getAdvancePaymentHistorySuccess: false,
      };
    }
    case "RESET_GET_ADVANCE_PAYMENT_HISTORY": {
      return {
        ...state,
        getAdvancePaymentHistorySuccess: false,
        getAdvancePaymentHistoryFailure: false,
        getAdvancePaymentHistoryList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ADVANCE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        createAdvancePaymentHistorySuccess: true,
        createAdvancePaymentHistoryData: action.payload.data.data,
        createAdvancePaymentHistoryFailure: false,
      };
    }
    case "CREATE_ADVANCE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        createAdvancePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createAdvancePaymentHistorySuccess: false,
      };
    }
    case "RESET_CREATE_ADVANCE_PAYMENT_HISTORY": {
      return {
        ...state,
        createAdvancePaymentHistorySuccess: false,
        createAdvancePaymentHistoryFailure: false,
        createAdvancePaymentHistoryData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ADVANCE_PAYMENT_HISTORY_SUCCESS": {
      return {
        ...state,
        updateAdvancePaymentHistorySuccess: true,
        updateAdvancePaymentHistoryData: action.payload.data.data,
        updateAdvancePaymentHistoryFailure: false,
      };
    }
    case "UPDATE_ADVANCE_PAYMENT_HISTORY_FAILURE": {
      return {
        ...state,
        updateAdvancePaymentHistoryFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateAdvancePaymentHistorySuccess: false,
      };
    }
    case "RESET_UPDATE_ADVANCE_PAYMENT_HISTORY": {
      return {
        ...state,
        updateAdvancePaymentHistorySuccess: false,
        updateAdvancePaymentHistoryFailure: false,
        updateAdvancePaymentHistoryData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_ADVANCE_PAYMENT_HISTORY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteAdvancePaymentHistorySuccess: true,
    //     deleteAdvancePaymentHistoryFailure: false,
    //   };
    // }
    // case "DELETE_ADVANCE_PAYMENT_HISTORY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteAdvancePaymentHistoryFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteAdvancePaymentHistorySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_ADVANCE_PAYMENT_HISTORY": {
    //   return {
    //     ...state,
    //     deleteAdvancePaymentHistorySuccess: false,
    //     deleteAdvancePaymentHistoryFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
