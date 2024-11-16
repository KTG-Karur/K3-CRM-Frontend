// employee/reducers.ts
const initialState = {
  getClaimList: [],
  createClaimData: null,
  updateClaimData: null,
  isLoading: false,
  errorMessage: null,
  getClaimSuccess: false,
  getClaimFailure: false,
  createClaimSuccess: false,
  createClaimFailure: false,
  updateClaimSuccess: false,
  updateClaimFailure: false,
  deleteClaimSuccess: false,
  deleteClaimFailure: false,
};

export default function claimReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_CLAIM_SUCCESS": {
      return {
        ...state,
        getClaimSuccess: true,
        getClaimList: action.payload.data.data,
        getClaimFailure: false,
      };
    }
    case "GET_CLAIM_FAILURE": {
      return {
        ...state,
        getClaimFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getClaimSuccess: false,
      };
    }
    case "RESET_GET_CLAIM": {
      return {
        ...state,
        getClaimSuccess: false,
        getClaimFailure: false,
        getClaimList: [],
        errorMessage: null,
      };
    }

    case "CREATE_CLAIM_SUCCESS": {
      return {
        ...state,
        createClaimSuccess: true,
        createClaimData: action.payload.data.data,
        createClaimFailure: false,
      };
    }
    case "CREATE_CLAIM_FAILURE": {
      return {
        ...state,
        createClaimFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createClaimSuccess: false,
      };
    }
    case "RESET_CREATE_CLAIM": {
      return {
        ...state,
        createClaimSuccess: false,
        createClaimFailure: false,
        createClaimData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_CLAIM_SUCCESS": {
      return {
        ...state,
        updateClaimSuccess: true,
        updateClaimData: action.payload.data.data,
        updateClaimFailure: false,
      };
    }
    case "UPDATE_CLAIM_FAILURE": {
      return {
        ...state,
        updateClaimFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateClaimSuccess: false,
      };
    }
    case "RESET_UPDATE_CLAIM": {
      return {
        ...state,
        updateClaimSuccess: false,
        updateClaimFailure: false,
        updateClaimData: null,
        errorMessage: null,
      };
    }

    case "DELETE_CLAIM_SUCCESS": {
      return {
        ...state,
        deleteClaimSuccess: true,
        deleteClaimFailure: false,
      };
    }
    case "DELETE_CLAIM_FAILURE": {
      return {
        ...state,
        deleteClaimFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteClaimSuccess: false,
      };
    }
    case "RESET_DELETE_CLAIM": {
      return {
        ...state,
        deleteClaimSuccess: false,
        deleteClaimFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
