// employee/reducers.ts
const initialState = {
  getAttendanceInchargeList: [],
  createAttendanceInchargeData: null,
  updateAttendanceInchargeData: null,
  isLoading: false,
  errorMessage: null,
  getAttendanceInchargeSuccess: false,
  getAttendanceInchargeFailure: false,
  createAttendanceInchargeSuccess: false,
  createAttendanceInchargeFailure: false,
  updateAttendanceInchargeSuccess: false,
  updateAttendanceInchargeFailure: false,
  deleteAttendanceInchargeSuccess: false,
  deleteAttendanceInchargeFailure: false,
};

export default function attendanceInchargeReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_ATTENDANCE_INCHARGE_SUCCESS": {
      return {
        ...state,
        getAttendanceInchargeSuccess: true,
        getAttendanceInchargeList: action.payload.data.data,
        getAttendanceInchargeFailure: false,
      };
    }
    case "GET_ATTENDANCE_INCHARGE_FAILURE": {
      return {
        ...state,
        getAttendanceInchargeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getAttendanceInchargeSuccess: false,
      };
    }
    case "RESET_GET_ATTENDANCE_INCHARGE": {
      return {
        ...state,
        getAttendanceInchargeSuccess: false,
        getAttendanceInchargeFailure: false,
        getAttendanceInchargeList: [],
        errorMessage: null,
      };
    }

    case "CREATE_ATTENDANCE_INCHARGE_SUCCESS": {
      return {
        ...state,
        createAttendanceInchargeSuccess: true,
        createAttendanceInchargeData: action.payload.data.data,
        createAttendanceInchargeFailure: false,
      };
    }
    case "CREATE_ATTENDANCE_INCHARGE_FAILURE": {
      return {
        ...state,
        createAttendanceInchargeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createAttendanceInchargeSuccess: false,
      };
    }
    case "RESET_CREATE_ATTENDANCE_INCHARGE": {
      return {
        ...state,
        createAttendanceInchargeSuccess: false,
        createAttendanceInchargeFailure: false,
        createAttendanceInchargeData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_ATTENDANCE_INCHARGE_SUCCESS": {
      return {
        ...state,
        updateAttendanceInchargeSuccess: true,
        updateAttendanceInchargeData: action.payload.data.data,
        updateAttendanceInchargeFailure: false,
      };
    }
    case "UPDATE_ATTENDANCE_INCHARGE_FAILURE": {
      return {
        ...state,
        updateAttendanceInchargeFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateAttendanceInchargeSuccess: false,
      };
    }
    case "RESET_UPDATE_ATTENDANCE_INCHARGE": {
      return {
        ...state,
        updateAttendanceInchargeSuccess: false,
        updateAttendanceInchargeFailure: false,
        updateAttendanceInchargeData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_ATTENDANCE_INCHARGE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteAttendanceInchargeSuccess: true,
    //     deleteAttendanceInchargeFailure: false,
    //   };
    // }
    // case "DELETE_ATTENDANCE_INCHARGE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteAttendanceInchargeFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteAttendanceInchargeSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_ATTENDANCE_INCHARGE": {
    //   return {
    //     ...state,
    //     deleteAttendanceInchargeSuccess: false,
    //     deleteAttendanceInchargeFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
