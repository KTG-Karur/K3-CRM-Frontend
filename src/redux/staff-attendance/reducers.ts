// employee/reducers.ts
const initialState = {
  getStaffAttendanceList: [],
  createStaffAttendanceData: null,
  updateStaffAttendanceData: null,
  isLoading: false,
  errorMessage: null,
  getStaffAttendanceSuccess: false,
  getStaffAttendanceFailure: false,
  createStaffAttendanceSuccess: false,
  createStaffAttendanceFailure: false,
  updateStaffAttendanceSuccess: false,
  updateStaffAttendanceFailure: false,
  deleteStaffAttendanceSuccess: false,
  deleteStaffAttendanceFailure: false,
};

export default function StaffAttendanceReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_STAFF_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        getStaffAttendanceSuccess: true,
        getStaffAttendanceList: action.payload.data.data,
        getStaffAttendanceFailure: false,
      };
    }
    case "GET_STAFF_ATTENDANCE_FAILURE": {
      return {
        ...state,
        getStaffAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getStaffAttendanceSuccess: false,
      };
    }
    case "RESET_GET_STAFF_ATTENDANCE": {
      return {
        ...state,
        getStaffAttendanceSuccess: false,
        getStaffAttendanceFailure: false,
        getStaffAttendanceList: [],
        errorMessage: null,
      };
    }

    case "CREATE_STAFF_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        createStaffAttendanceSuccess: true,
        createStaffAttendanceData: action.payload.data.data,
        createStaffAttendanceFailure: false,
      };
    }
    case "CREATE_STAFF_ATTENDANCE_FAILURE": {
      return {
        ...state,
        createStaffAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createStaffAttendanceSuccess: false,
      };
    }
    case "RESET_CREATE_STAFF_ATTENDANCE": {
      return {
        ...state,
        createStaffAttendanceSuccess: false,
        createStaffAttendanceFailure: false,
        createStaffAttendanceData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_STAFF_ATTENDANCE_SUCCESS": {
      return {
        ...state,
        updateStaffAttendanceSuccess: true,
        updateStaffAttendanceData: action.payload.data.data,
        updateStaffAttendanceFailure: false,
      };
    }
    case "UPDATE_STAFF_ATTENDANCE_FAILURE": {
      return {
        ...state,
        updateStaffAttendanceFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateStaffAttendanceSuccess: false,
      };
    }
    case "RESET_UPDATE_STAFF_ATTENDANCE": {
      return {
        ...state,
        updateStaffAttendanceSuccess: false,
        updateStaffAttendanceFailure: false,
        updateStaffAttendanceData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_STAFF_ATTENDANCE_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteStaffAttendanceSuccess: true,
    //     deleteStaffAttendanceFailure: false,
    //   };
    // }
    // case "DELETE_STAFF_ATTENDANCE_FAILURE": {
    //   return {
    //     ...state,
    //     deleteStaffAttendanceFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteStaffAttendanceSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_STAFF_ATTENDANCE": {
    //   return {
    //     ...state,
    //     deleteStaffAttendanceSuccess: false,
    //     deleteStaffAttendanceFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
