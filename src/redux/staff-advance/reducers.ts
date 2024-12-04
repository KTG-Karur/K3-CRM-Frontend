// employee/reducers.ts
const initialState = {
  getStaffAdvanceList: [],
  getStaffAdvanceLedgerData: [],
  createStaffAdvanceData: null,
  updateStaffAdvanceData: null,
  isLoading: false,
  errorMessage: null,
  getStaffAdvanceSuccess: false,
  getStaffAdvanceFailure: false,
  getStaffAdvanceLedgerSuccess: false,
  getStaffAdvanceLedgerFailure: false,
  createStaffAdvanceSuccess: false,
  createStaffAdvanceFailure: false,
  updateStaffAdvanceSuccess: false,
  updateStaffAdvanceFailure: false,
  deleteStaffAdvanceSuccess: false,
  deleteStaffAdvanceFailure: false,
};

export default function staffAdvanceReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_ADVANCE_SUCCESS": {
      return {
        ...state,
        getStaffAdvanceSuccess: true,
        getStaffAdvanceList: action.payload.data.data,
        getStaffAdvanceFailure: false,
      };
    }
    case "GET_STAFF_ADVANCE_FAILURE": {
      return {
        ...state,
        getStaffAdvanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffAdvanceSuccess: false,
      };
    }
    case "RESET_GET_STAFF_ADVANCE": {
      return {
        ...state,
        getStaffAdvanceSuccess: false,
        getStaffAdvanceFailure: false,
        getStaffAdvanceList: [],
        errorMessage: null,
      };
    }



    case "GET_STAFF_ADVANCE_LEDGER_SUCCESS": {
      return {
        ...state,
        getStaffAdvanceLedgerSuccess: true,
        getStaffAdvanceLedgerData: action.payload.data.data,
        getStaffAdvanceLedgerFailure: false,
      };
    }
    case "GET_STAFF_ADVANCE_LEDGER_FAILURE": {
      return {
        ...state,
        getStaffAdvanceLedgerFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffAdvanceLedgerSuccess: false,
      };
    }
    case "RESET_GET_STAFF_ADVANCE_LEDGER": {
      return {
        ...state,
        getStaffAdvanceLedgerSuccess: false,
        getStaffAdvanceLedgerFailure: false,
        getStaffAdvanceLedgerData: [],
        errorMessage: null,
      };
    }




    case "CREATE_STAFF_ADVANCE_SUCCESS": {
      return {
        ...state,
        createStaffAdvanceSuccess: true,
        createStaffAdvanceData: action.payload.data.data,
        createStaffAdvanceFailure: false,
      };
    }
    case "CREATE_STAFF_ADVANCE_FAILURE": {
      return {
        ...state,
        createStaffAdvanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffAdvanceSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_ADVANCE": {
      return {
        ...state,
        createStaffAdvanceSuccess: false,
        createStaffAdvanceFailure: false,
        createStaffAdvanceData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_ADVANCE_SUCCESS": {
      return {
        ...state,
        updateStaffAdvanceSuccess: true,
        updateStaffAdvanceData: action.payload.data.data,
        updateStaffAdvanceFailure: false,
      };
    }
    case "UPDATE_STAFF_ADVANCE_FAILURE": {
      return {
        ...state,
        updateStaffAdvanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffAdvanceSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_ADVANCE": {
      return {
        ...state,
        updateStaffAdvanceSuccess: false,
        updateStaffAdvanceFailure: false,
        updateStaffAdvanceData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STAFF_ADVANCE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStaffAdvanceSuccess: true,
    //     deleteStaffAdvanceFailure: false,
    //   };
    // }
    // case "DELETE_STAFF_ADVANCE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStaffAdvanceFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteStaffAdvanceSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STAFF_ADVANCE": {
    //   return {
    //     ...state,
    //     deleteStaffAdvanceSuccess: false,
    //     deleteStaffAdvanceFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
