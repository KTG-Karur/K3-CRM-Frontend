// employee/reducers.ts
const initialState = {
  getPageList: [],
  createPageData: null,
  updatePageData: null,
  isLoading: false,
  errorMessage: null,
  getPageSuccess: false,
  getPageFailure: false,
  createPageSuccess: false,
  createPageFailure: false,
  updatePageSuccess: false,
  updatePageFailure: false,
  deletePageSuccess: false,
  deletePageFailure: false,
};

export default function pageReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_PAGE_SUCCESS": {
      return {
        ...state,
        getPageSuccess: true,
        getPageList: action.payload.data.data,
        getPageFailure: false,
      };
    }
    case "GET_PAGE_FAILURE": {
      return {
        ...state,
        getPageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getPageSuccess: false,
      };
    }
    case "RESET_GET_PAGE": {
      return {
        ...state,
        getPageSuccess: false,
        getPageFailure: false,
        getPageList: [],
        errorMessage: null,
      };
    }

    case "CREATE_PAGE_SUCCESS": {
      return {
        ...state,
        createPageSuccess: true,
        createPageData: action.payload.data.data,
        createPageFailure: false,
      };
    }
    case "CREATE_PAGE_FAILURE": {
      return {
        ...state,
        createPageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createPageSuccess: false,
      };
    }
    case "RESET_CREATE_PAGE": {
      return {
        ...state,
        createPageSuccess: false,
        createPageFailure: false,
        createPageData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_PAGE_SUCCESS": {
      return {
        ...state,
        updatePageSuccess: true,
        updatePageData: action.payload.data.data,
        updatePageFailure: false,
      };
    }
    case "UPDATE_PAGE_FAILURE": {
      return {
        ...state,
        updatePageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updatePageSuccess: false,
      };
    }
    case "RESET_UPDATE_PAGE": {
      return {
        ...state,
        updatePageSuccess: false,
        updatePageFailure: false,
        updatePageData: null,
        errorMessage: null,
      };
    }

    case "DELETE_PAGE_SUCCESS": {
      return {
        ...state,
        deletePageSuccess: true,
        deletePageFailure: false,
      };
    }
    case "DELETE_PAGE_FAILURE": {
      return {
        ...state,
        deletePageFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        deletePageSuccess: false,
      };
    }
    case "RESET_DELETE_PAGE": {
      return {
        ...state,
        deletePageSuccess: false,
        deletePageFailure: false,
        errorMessage: null,
      };
    }

    default: {
      return state;
    }
  }
}
