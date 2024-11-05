// employee/reducers.ts
const initialState = {
  getStaffProofList: [],
  createStaffProofData: null,
  updateStaffProofData: null,
  isLoading: false,
  errorMessage: null,
  getStaffProofSuccess: false,
  getStaffProofFailure: false,
  createStaffProofSuccess: false,
  createStaffProofFailure: false,
  updateStaffProofSuccess: false,
  updateStaffProofFailure: false,
  deleteStaffProofSuccess: false,
  deleteStaffProofFailure: false,
};

export default function staffProofReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_PROOF_SUCCESS": {
      return {
        ...state,
        getStaffProofSuccess: true,
        getStaffProofList: action.payload.data.data,
        getStaffProofFailure: false,
      };
    }
    case "GET_STAFF_PROOF_FAILURE": {
      return {
        ...state,
        getStaffProofFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffProofSuccess: false,
      };
    }
    case "RESET_GET_STAFF_PROOF": {
      return {
        ...state,
        getStaffProofSuccess: false,
        getStaffProofFailure: false,
        getStaffProofList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_PROOF_SUCCESS": {
      return {
        ...state,
        createStaffProofSuccess: true,
        createStaffProofData: action.payload.data.data,
        createStaffProofFailure: false,
      };
    }
    case "CREATE_STAFF_PROOF_FAILURE": {
      return {
        ...state,
        createStaffProofFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffProofSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_PROOF": {
      return {
        ...state,
        createStaffProofSuccess: false,
        createStaffProofFailure: false,
        createStaffProofData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_PROOF_SUCCESS": {
      return {
        ...state,
        updateStaffProofSuccess: true,
        updateStaffProofData: action.payload.data.data,
        updateStaffProofFailure: false,
      };
    }
    case "UPDATE_STAFF_PROOF_FAILURE": {
      return {
        ...state,
        updateStaffProofFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffProofSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_PROOF": {
      return {
        ...state,
        updateStaffProofSuccess: false,
        updateStaffProofFailure: false,
        updateStaffProofData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_PROOF_SUCCESS": {
      return {
        ...state,
        deleteStaffProofSuccess: true,
        deleteStaffProofFailure: false,
      };
    }
    case "DELETE_STAFF_PROOF_FAILURE": {
      return {
        ...state,
        deleteStaffProofFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffProofSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_PROOF": {
      return {
        ...state,
        deleteStaffProofSuccess: false,
        deleteStaffProofFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
