// employee/reducers.ts
const initialState = {
  getProofTypeList: [],
  createProofTypeData: null,
  updateProofTypeData: null,
  isLoading: false,
  errorMessage: null,
  getProofTypeSuccess: false,
  getProofTypeFailure: false,
  createProofTypeSuccess: false,
  createProofTypeFailure: false,
  updateProofTypeSuccess: false,
  updateProofTypeFailure: false,
  deleteProofTypeSuccess: false,
  deleteProofTypeFailure: false,
};

export default function proofTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_PROOF_TYPE_SUCCESS": {
      return {
        ...state,
        getProofTypeSuccess: true,
        getProofTypeList: action.payload.data.data,
        getProofTypeFailure: false,
      };
    }
    case "GET_PROOF_TYPE_FAILURE": {
      return {
        ...state,
        getProofTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getProofTypeSuccess: false,
      };
    }
    case "RESET_GET_PROOF_TYPE": {
      return {
        ...state,
        getProofTypeSuccess: false,
        getProofTypeFailure: false,
        getProofTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_PROOF_TYPE_SUCCESS": {
      return {
        ...state,
        createProofTypeSuccess: true,
        createProofTypeData: action.payload.data.data,
        createProofTypeFailure: false,
      };
    }
    case "CREATE_PROOF_TYPE_FAILURE": {
      return {
        ...state,
        createProofTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createProofTypeSuccess: false,
      };
    }
    case "RESET_CREATE_PROOF_TYPE": {
      return {
        ...state,
        createProofTypeSuccess: false,
        createProofTypeFailure: false,
        createProofTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_PROOF_TYPE_SUCCESS": {
      return {
        ...state,
        updateProofTypeSuccess: true,
        updateProofTypeData: action.payload.data.data,
        updateProofTypeFailure: false,
      };
    }
    case "UPDATE_PROOF_TYPE_FAILURE": {
      return {
        ...state,
        updateProofTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateProofTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_PROOF_TYPE": {
      return {
        ...state,
        updateProofTypeSuccess: false,
        updateProofTypeFailure: false,
        updateProofTypeData: null,
        errorMessage: null,
      };
    }

    case "DELETE_PROOF_TYPE_SUCCESS": {
      return {
        ...state,
        deleteProofTypeSuccess: true,
        deleteProofTypeFailure: false,
      };
    }
    case "DELETE_PROOF_TYPE_FAILURE": {
      return {
        ...state,
        deleteProofTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteProofTypeSuccess: false,
      };
    }
    case "RESET_DELETE_PROOF_TYPE": {
      return {
        ...state,
        deleteProofTypeSuccess: false,
        deleteProofTypeFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
