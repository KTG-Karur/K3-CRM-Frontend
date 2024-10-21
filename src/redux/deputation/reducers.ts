// employee/reducers.ts
const initialState = {
  getDeputationList: [],
  createDeputationData: null,
  updateDeputationData: null,
  isLoading: false,
  errorMessage: null,
  getDeputationSuccess: false,
  getDeputationFailure: false,
  createDeputationSuccess: false,
  createDeputationFailure: false,
  updateDeputationSuccess: false,
  updateDeputationFailure: false,
  deleteDeputationSuccess: false,
  deleteDeputationFailure: false,
};

export default function deputationReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DEPUTATION_SUCCESS": {
      return {
        ...state,
        getDeputationSuccess: true,
        getDeputationList: action.payload.data.data,
        getDeputationFailure: false,
      };
    }
    case "GET_DEPUTATION_FAILURE": {
      return {
        ...state,
        getDeputationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDeputationSuccess: false,
      };
    }
    case "RESET_GET_DEPUTATION": {
      return {
        ...state,
        getDeputationSuccess: false,
        getDeputationFailure: false,
        getDeputationList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DEPUTATION_SUCCESS": {
      return {
        ...state,
        createDeputationSuccess: true,
        createDeputationData: action.payload.data.data,
        createDeputationFailure: false,
      };
    }
    case "CREATE_DEPUTATION_FAILURE": {
      return {
        ...state,
        createDeputationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDeputationSuccess: false,
      };
    }
    case "RESET_CREATE_DEPUTATION": {
      return {
        ...state,
        createDeputationSuccess: false,
        createDeputationFailure: false,
        createDeputationData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DEPUTATION_SUCCESS": {
      return {
        ...state,
        updateDeputationSuccess: true,
        updateDeputationData: action.payload.data.data,
        updateDeputationFailure: false,
      };
    }
    case "UPDATE_DEPUTATION_FAILURE": {
      return {
        ...state,
        updateDeputationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDeputationSuccess: false,
      };
    }
    case "RESET_UPDATE_DEPUTATION": {
      return {
        ...state,
        updateDeputationSuccess: false,
        updateDeputationFailure: false,
        updateDeputationData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DEPUTATION_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDeputationSuccess: true,
    //     deleteDeputationFailure: false,
    //   };
    // }
    // case "DELETE_DEPUTATION_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDeputationFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDeputationSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DEPUTATION": {
    //   return {
    //     ...state,
    //     deleteDeputationSuccess: false,
    //     deleteDeputationFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
