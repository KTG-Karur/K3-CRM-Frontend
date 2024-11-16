// employee/reducers.ts
const initialState = {
  getBranchList: [],
  createBranchData: null,
  updateBranchData: null,
  isLoading: false,
  errorMessage: null,
  getBranchSuccess: false,
  getBranchFailure: false,
  createBranchSuccess: false,
  createBranchFailure: false,
  updateBranchSuccess: false,
  updateBranchFailure: false,
  deleteBranchSuccess: false,
  deleteBranchFailure: false,
};

export default function branchReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_BRANCH_SUCCESS": {
      return {
        ...state,
        getBranchSuccess: true,
        getBranchList: action.payload.data.data,
        getBranchFailure: false,
      };
    }
    case "GET_BRANCH_FAILURE": {
      return {
        ...state,
        getBranchFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getBranchSuccess: false,
      };
    }
    case "RESET_GET_BRANCH": {
      return {
        ...state,
        getBranchSuccess: false,
        getBranchFailure: false,
        getBranchList: [],
        errorMessage: null,
      };
    }

    case "CREATE_BRANCH_SUCCESS": {
      return {
        ...state,
        createBranchSuccess: true,
        createBranchData: action.payload.data.data,
        createBranchFailure: false,
      };
    }
    case "CREATE_BRANCH_FAILURE": {
      return {
        ...state,
        createBranchFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createBranchSuccess: false,
      };
    }
    case "RESET_CREATE_BRANCH": {
      return {
        ...state,
        createBranchSuccess: false,
        createBranchFailure: false,
        createBranchData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_BRANCH_SUCCESS": {
      return {
        ...state,
        updateBranchSuccess: true,
        updateBranchData: action.payload.data.data,
        updateBranchFailure: false,
      };
    }
    case "UPDATE_BRANCH_FAILURE": {
      return {
        ...state,
        updateBranchFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateBranchSuccess: false,
      };
    }
    case "RESET_UPDATE_BRANCH": {
      return {
        ...state,
        updateBranchSuccess: false,
        updateBranchFailure: false,
        updateBranchData: null,
        errorMessage: null,
      };
    }

    case "DELETE_BRANCH_SUCCESS": {
      return {
        ...state,
        deleteBranchSuccess: true,
        deleteBranchFailure: false,
      };
    }
    case "DELETE_BRANCH_FAILURE": {
      return {
        ...state,
        deleteBranchFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deleteBranchSuccess: false,
      };
    }
    case "RESET_DELETE_BRANCH": {
      return {
        ...state,
        deleteBranchSuccess: false,
        deleteBranchFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
