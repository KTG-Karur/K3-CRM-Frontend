// employee/reducers.ts
const initialState = {
  getClaimTypeList: [],
  createClaimTypeData: null,
  updateClaimTypeData: null,
  isLoading: false,
  errorMessage: null,
  getClaimTypeSuccess: false,
  getClaimTypeFailure: false,
  createClaimTypeSuccess: false,
  createClaimTypeFailure: false,
  updateClaimTypeSuccess: false,
  updateClaimTypeFailure: false,
  deleteClaimTypeSuccess: false,
  deleteClaimTypeFailure: false,
};

export default function claimTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_CLAIM_TYPE_SUCCESS": {
      return {
        ...state,
        getClaimTypeSuccess: true,
        getClaimTypeList: action.payload.data.data,
        getClaimTypeFailure: false,
      };
    }
    case "GET_CLAIM_TYPE_FAILURE": {
      return {
        ...state,
        getClaimTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getClaimTypeSuccess: false,
      };
    }
    case "RESET_GET_CLAIM_TYPE": {
      return {
        ...state,
        getClaimTypeSuccess: false,
        getClaimTypeFailure: false,
        getClaimTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_CLAIM_TYPE_SUCCESS": {
      return {
        ...state,
        createClaimTypeSuccess: true,
        createClaimTypeData: action.payload.data.data,
        createClaimTypeFailure: false,
      };
    }
    case "CREATE_CLAIM_TYPE_FAILURE": {
      return {
        ...state,
        createClaimTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createClaimTypeSuccess: false,
      };
    }
    case "RESET_CREATE_CLAIM_TYPE": {
      return {
        ...state,
        createClaimTypeSuccess: false,
        createClaimTypeFailure: false,
        createClaimTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_CLAIM_TYPE_SUCCESS": {
      return {
        ...state,
        updateClaimTypeSuccess: true,
        updateClaimTypeData: action.payload.data.data,
        updateClaimTypeFailure: false,
      };
    }
    case "UPDATE_CLAIM_TYPE_FAILURE": {
      return {
        ...state,
        updateClaimTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateClaimTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_CLAIM_TYPE": {
      return {
        ...state,
        updateClaimTypeSuccess: false,
        updateClaimTypeFailure: false,
        updateClaimTypeData: null,
        errorMessage: null,
      };
    }

    case "DELETE_CLAIM_TYPE_SUCCESS": {
      return {
        ...state,
        deleteClaimTypeSuccess: true,
        deleteClaimTypeFailure: false,
      };
    }
    case "DELETE_CLAIM_TYPE_FAILURE": {
      return {
        ...state,
        deleteClaimTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteClaimTypeSuccess: false,
      };
    }
    case "RESET_DELETE_CLAIM_TYPE": {
      return {
        ...state,
        deleteClaimTypeSuccess: false,
        deleteClaimTypeFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
