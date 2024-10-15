// employee/reducers.ts
const initialState = {
  getDesignationList: [],
  createDesignationData: null,
  updateDesignationData: null,
  isLoading: false,
  errorMessage: null,
  getDesignationSuccess: false,
  getDesignationFailure: false,
  createDesignationSuccess: false,
  createDesignationFailure: false,
  updateDesignationSuccess: false,
  updateDesignationFailure: false,
  deleteDesignationSuccess: false,
  deleteDesignationFailure: false,
};

export default function designationReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_DESIGNATION_SUCCESS": {
      return {
        ...state,
        getDesignationSuccess: true,
        getDesignationList: action.payload.data.data,
        getDesignationFailure: false,
      };
    }
    case "GET_DESIGNATION_FAILURE": {
      return {
        ...state,
        getDesignationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getDesignationSuccess: false,
      };
    }
    case "RESET_GET_DESIGNATION": {
      return {
        ...state,
        getDesignationSuccess: false,
        getDesignationFailure: false,
        getDesignationList: [],
        errorMessage: null,
      };
    }

    case "CREATE_DESIGNATION_SUCCESS": {
      return {
        ...state,
        createDesignationSuccess: true,
        createDesignationData: action.payload.data.data,
        createDesignationFailure: false,
      };
    }
    case "CREATE_DESIGNATION_FAILURE": {
      return {
        ...state,
        createDesignationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createDesignationSuccess: false,
      };
    }
    case "RESET_CREATE_DESIGNATION": {
      return {
        ...state,
        createDesignationSuccess: false,
        createDesignationFailure: false,
        createDesignationData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_DESIGNATION_SUCCESS": {
      return {
        ...state,
        updateDesignationSuccess: true,
        updateDesignationData: action.payload.data.data,
        updateDesignationFailure: false,
      };
    }
    case "UPDATE_DESIGNATION_FAILURE": {
      return {
        ...state,
        updateDesignationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateDesignationSuccess: false,
      };
    }
    case "RESET_UPDATE_DESIGNATION": {
      return {
        ...state,
        updateDesignationSuccess: false,
        updateDesignationFailure: false,
        updateDesignationData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_DESIGNATION_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteDesignationSuccess: true,
    //     deleteDesignationFailure: false,
    //   };
    // }
    // case "DELETE_DESIGNATION_FAILURE": {
    //   return {
    //     ...state,
    //     deleteDesignationFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteDesignationSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_DESIGNATION": {
    //   return {
    //     ...state,
    //     deleteDesignationSuccess: false,
    //     deleteDesignationFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
