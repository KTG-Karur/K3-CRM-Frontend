// employee/reducers.ts
const initialState = {
  getStaffRelationList: [],
  createStaffRelationData: null,
  updateStaffRelationData: null,
  isLoading: false,
  errorMessage: null,
  getStaffRelationSuccess: false,
  getStaffRelationFailure: false,
  createStaffRelationSuccess: false,
  createStaffRelationFailure: false,
  updateStaffRelationSuccess: false,
  updateStaffRelationFailure: false,
  deleteStaffRelationSuccess: false,
  deleteStaffRelationFailure: false,
};

export default function staffRelationReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_RELATION_SUCCESS": {
      return {
        ...state,
        getStaffRelationSuccess: true,
        getStaffRelationList: action.payload.data.data,
        getStaffRelationFailure: false,
      };
    }
    case "GET_STAFF_RELATION_FAILURE": {
      return {
        ...state,
        getStaffRelationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffRelationSuccess: false,
      };
    }
    case "RESET_GET_STAFF_RELATION": {
      return {
        ...state,
        getStaffRelationSuccess: false,
        getStaffRelationFailure: false,
        getStaffRelationList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_RELATION_SUCCESS": {
      return {
        ...state,
        createStaffRelationSuccess: true,
        createStaffRelationData: action.payload.data.data,
        createStaffRelationFailure: false,
      };
    }
    case "CREATE_STAFF_RELATION_FAILURE": {
      return {
        ...state,
        createStaffRelationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffRelationSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_RELATION": {
      return {
        ...state,
        createStaffRelationSuccess: false,
        createStaffRelationFailure: false,
        createStaffRelationData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_RELATION_SUCCESS": {
      return {
        ...state,
        updateStaffRelationSuccess: true,
        updateStaffRelationData: action.payload.data.data,
        updateStaffRelationFailure: false,
      };
    }
    case "UPDATE_STAFF_RELATION_FAILURE": {
      return {
        ...state,
        updateStaffRelationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffRelationSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_RELATION": {
      return {
        ...state,
        updateStaffRelationSuccess: false,
        updateStaffRelationFailure: false,
        updateStaffRelationData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_RELATION_SUCCESS": {
      return {
        ...state,
        deleteStaffRelationSuccess: true,
        deleteStaffRelationFailure: false,
      };
    }
    case "DELETE_STAFF_RELATION_FAILURE": {
      return {
        ...state,
        deleteStaffRelationFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffRelationSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_RELATION": {
      return {
        ...state,
        deleteStaffRelationSuccess: false,
        deleteStaffRelationFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
