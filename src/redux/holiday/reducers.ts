// employee/reducers.ts
const initialState = {
  getHolidayList: [],
  createHolidayData: null,
  updateHolidayData: null,
  isLoading: false,
  errorMessage: null,
  getHolidaySuccess: false,
  getHolidayFailure: false,
  createHolidaySuccess: false,
  createHolidayFailure: false,
  updateHolidaySuccess: false,
  updateHolidayFailure: false,
  deleteHolidaySuccess: false,
  deleteHolidayFailure: false,
};

export default function holidayReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_HOLIDAY_SUCCESS": {
      return {
        ...state,
        getHolidaySuccess: true,
        getHolidayList: action.payload.data.data,
        getHolidayFailure: false,
      };
    }
    case "GET_HOLIDAY_FAILURE": {
      return {
        ...state,
        getHolidayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getHolidaySuccess: false,
      };
    }
    case "RESET_GET_HOLIDAY": {
      return {
        ...state,
        getHolidaySuccess: false,
        getHolidayFailure: false,
        getHolidayList: [],
        errorMessage: null,
      };
    }

    case "CREATE_HOLIDAY_SUCCESS": {
      return {
        ...state,
        createHolidaySuccess: true,
        createHolidayData: action.payload.data.data,
        createHolidayFailure: false,
      };
    }
    case "CREATE_HOLIDAY_FAILURE": {
      return {
        ...state,
        createHolidayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createHolidaySuccess: false,
      };
    }
    case "RESET_CREATE_HOLIDAY": {
      return {
        ...state,
        createHolidaySuccess: false,
        createHolidayFailure: false,
        createHolidayData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_HOLIDAY_SUCCESS": {
      return {
        ...state,
        updateHolidaySuccess: true,
        updateHolidayData: action.payload.data.data,
        updateHolidayFailure: false,
      };
    }
    case "UPDATE_HOLIDAY_FAILURE": {
      return {
        ...state,
        updateHolidayFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateHolidaySuccess: false,
      };
    }
    case "RESET_UPDATE_HOLIDAY": {
      return {
        ...state,
        updateHolidaySuccess: false,
        updateHolidayFailure: false,
        updateHolidayData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_HOLIDAY_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteHolidaySuccess: true,
    //     deleteHolidayFailure: false,
    //   };
    // }
    // case "DELETE_HOLIDAY_FAILURE": {
    //   return {
    //     ...state,
    //     deleteHolidayFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteHolidaySuccess: false,
    //   };
    // }
    // case "RESET_DELETE_HOLIDAY": {
    //   return {
    //     ...state,
    //     deleteHolidaySuccess: false,
    //     deleteHolidayFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
