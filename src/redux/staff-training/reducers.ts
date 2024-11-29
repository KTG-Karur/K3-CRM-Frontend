// employee/reducers.ts
const initialState = {
  getStaffTrainingList: [],
  createStaffTrainingData: null,
  updateStaffTrainingData: null,
  isLoading: false,
  errorMessage: null,
  getStaffTrainingSuccess: false,
  getStaffTrainingFailure: false,
  createStaffTrainingSuccess: false,
  createStaffTrainingFailure: false,
  updateStaffTrainingSuccess: false,
  updateStaffTrainingFailure: false,
  deleteStaffTrainingSuccess: false,
  deleteStaffTrainingFailure: false,
};

export default function staffTrainingReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_TRAINING_SUCCESS": {
      return {
        ...state,
        getStaffTrainingSuccess: true,
        getStaffTrainingList: action.payload.data.data,
        getStaffTrainingFailure: false,
      };
    }
    case "GET_STAFF_TRAINING_FAILURE": {
      return {
        ...state,
        getStaffTrainingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffTrainingSuccess: false,
      };
    }
    case "RESET_GET_STAFF_TRAINING": {
      return {
        ...state,
        getStaffTrainingSuccess: false,
        getStaffTrainingFailure: false,
        getStaffTrainingList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_TRAINING_SUCCESS": {
      return {
        ...state,
        createStaffTrainingSuccess: true,
        createStaffTrainingData: action.payload.data.data,
        createStaffTrainingFailure: false,
      };
    }
    case "CREATE_STAFF_TRAINING_FAILURE": {
      return {
        ...state,
        createStaffTrainingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffTrainingSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_TRAINING": {
      return {
        ...state,
        createStaffTrainingSuccess: false,
        createStaffTrainingFailure: false,
        createStaffTrainingData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_TRAINING_SUCCESS": {
      return {
        ...state,
        updateStaffTrainingSuccess: true,
        updateStaffTrainingData: action.payload.data.data,
        updateStaffTrainingFailure: false,
      };
    }
    case "UPDATE_STAFF_TRAINING_FAILURE": {
      return {
        ...state,
        updateStaffTrainingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffTrainingSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_TRAINING": {
      return {
        ...state,
        updateStaffTrainingSuccess: false,
        updateStaffTrainingFailure: false,
        updateStaffTrainingData: null,
        errorMessage: null,
      };
    }

    case "DELETE_STAFF_TRAINING_SUCCESS": {
      return {
        ...state,
        deleteStaffTrainingSuccess: true,
        deleteStaffTrainingFailure: false,
      };
    }
    case "DELETE_STAFF_TRAINING_FAILURE": {
      return {
        ...state,
        deleteStaffTrainingFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteStaffTrainingSuccess: false,
      };
    }
    case "RESET_DELETE_STAFF_TRAINING": {
      return {
        ...state,
        deleteStaffTrainingSuccess: false,
        deleteStaffTrainingFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
