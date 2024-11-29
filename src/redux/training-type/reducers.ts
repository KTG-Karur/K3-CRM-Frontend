// employee/reducers.ts
const initialState = {
  getTrainingTypeList: [],
  createTrainingTypeData: null,
  updateTrainingTypeData: null,
  isLoading: false,
  errorMessage: null,
  getTrainingTypeSuccess: false,
  getTrainingTypeFailure: false,
  createTrainingTypeSuccess: false,
  createTrainingTypeFailure: false,
  updateTrainingTypeSuccess: false,
  updateTrainingTypeFailure: false,
  deleteTrainingTypeSuccess: false,
  deleteTrainingTypeFailure: false,
};

export default function trainingTypeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_TRAINING_TYPE_SUCCESS": {
      return {
        ...state,
        getTrainingTypeSuccess: true,
        getTrainingTypeList: action.payload.data.data,
        getTrainingTypeFailure: false,
      };
    }
    case "GET_TRAINING_TYPE_FAILURE": {
      return {
        ...state,
        getTrainingTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getTrainingTypeSuccess: false,
      };
    }
    case "RESET_GET_TRAINING_TYPE": {
      return {
        ...state,
        getTrainingTypeSuccess: false,
        getTrainingTypeFailure: false,
        getTrainingTypeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_TRAINING_TYPE_SUCCESS": {
      return {
        ...state,
        createTrainingTypeSuccess: true,
        createTrainingTypeData: action.payload.data.data,
        createTrainingTypeFailure: false,
      };
    }
    case "CREATE_TRAINING_TYPE_FAILURE": {
      return {
        ...state,
        createTrainingTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createTrainingTypeSuccess: false,
      };
    }
    case "RESET_CREATE_TRAINING_TYPE": {
      return {
        ...state,
        createTrainingTypeSuccess: false,
        createTrainingTypeFailure: false,
        createTrainingTypeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_TRAINING_TYPE_SUCCESS": {
      return {
        ...state,
        updateTrainingTypeSuccess: true,
        updateTrainingTypeData: action.payload.data.data,
        updateTrainingTypeFailure: false,
      };
    }
    case "UPDATE_TRAINING_TYPE_FAILURE": {
      return {
        ...state,
        updateTrainingTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateTrainingTypeSuccess: false,
      };
    }
    case "RESET_UPDATE_TRAINING_TYPE": {
      return {
        ...state,
        updateTrainingTypeSuccess: false,
        updateTrainingTypeFailure: false,
        updateTrainingTypeData: null,
        errorMessage: null,
      };
    }

    case "DELETE_TRAINING_TYPE_SUCCESS": {
      return {
        ...state,
        deleteTrainingTypeSuccess: true,
        deleteTrainingTypeFailure: false,
      };
    }
    case "DELETE_TRAINING_TYPE_FAILURE": {
      return {
        ...state,
        deleteTrainingTypeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteTrainingTypeSuccess: false,
      };
    }
    case "RESET_DELETE_TRAINING_TYPE": {
      return {
        ...state,
        deleteTrainingTypeSuccess: false,
        deleteTrainingTypeFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
