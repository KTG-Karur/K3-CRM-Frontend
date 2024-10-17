// employee/reducers.ts
const initialState = {
  getPetrolAllowanceList: [],
  createPetrolAllowanceData: null,
  updatePetrolAllowanceData: null,
  isLoading: false,
  errorMessage: null,
  getPetrolAllowanceSuccess: false,
  getPetrolAllowanceFailure: false,
  createPetrolAllowanceSuccess: false,
  createPetrolAllowanceFailure: false,
  updatePetrolAllowanceSuccess: false,
  updatePetrolAllowanceFailure: false,
  deletePetrolAllowanceSuccess: false,
  deletePetrolAllowanceFailure: false,
};

export default function petrolAllowanceReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_PETROL_ALLOWANCE_SUCCESS": {
      return {
        ...state,
        getPetrolAllowanceSuccess: true,
        getPetrolAllowanceList: action.payload.data.data,
        getPetrolAllowanceFailure: false,
      };
    }
    case "GET_PETROL_ALLOWANCE_FAILURE": {
      return {
        ...state,
        getPetrolAllowanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getPetrolAllowanceSuccess: false,
      };
    }
    case "RESET_GET_PETROL_ALLOWANCE": {
      return {
        ...state,
        getPetrolAllowanceSuccess: false,
        getPetrolAllowanceFailure: false,
        getPetrolAllowanceList: [],
        errorMessage: null,
      };
    }

    case "CREATE_PETROL_ALLOWANCE_SUCCESS": {
      return {
        ...state,
        createPetrolAllowanceSuccess: true,
        createPetrolAllowanceData: action.payload.data.data,
        createPetrolAllowanceFailure: false,
      };
    }
    case "CREATE_PETROL_ALLOWANCE_FAILURE": {
      return {
        ...state,
        createPetrolAllowanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createPetrolAllowanceSuccess: false,
      };
    }
    case "RESET_CREATE_PETROL_ALLOWANCE": {
      return {
        ...state,
        createPetrolAllowanceSuccess: false,
        createPetrolAllowanceFailure: false,
        createPetrolAllowanceData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_PETROL_ALLOWANCE_SUCCESS": {
      return {
        ...state,
        updatePetrolAllowanceSuccess: true,
        updatePetrolAllowanceData: action.payload.data.data,
        updatePetrolAllowanceFailure: false,
      };
    }
    case "UPDATE_PETROL_ALLOWANCE_FAILURE": {
      return {
        ...state,
        updatePetrolAllowanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updatePetrolAllowanceSuccess: false,
      };
    }
    case "RESET_UPDATE_PETROL_ALLOWANCE": {
      return {
        ...state,
        updatePetrolAllowanceSuccess: false,
        updatePetrolAllowanceFailure: false,
        updatePetrolAllowanceData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_PETROL_ALLOWANCE_SUCCESS": {
    //   return {
    //     ...state,
    //     deletePetrolAllowanceSuccess: true,
    //     deletePetrolAllowanceFailure: false,
    //   };
    // }
    // case "DELETE_PETROL_ALLOWANCE_FAILURE": {
    //   return {
    //     ...state,
    //     deletePetrolAllowanceFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deletePetrolAllowanceSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_PETROL_ALLOWANCE": {
    //   return {
    //     ...state,
    //     deletePetrolAllowanceSuccess: false,
    //     deletePetrolAllowanceFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
