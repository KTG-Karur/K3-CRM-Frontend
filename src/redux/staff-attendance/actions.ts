//Get Reducer Call--->
export const getStaffAttendanceRequest = (params?: any) => ({
  type: 'GET_STAFF_ATTENDANCE_REQUEST',
  payload: params,
});

export const getStaffAttendanceSuccess = (data: any) => ({
  type: 'GET_STAFF_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const getStaffAttendanceFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffAttendance = () => ({
  type: 'RESET_GET_STAFF_ATTENDANCE',
});

//Create Reducer Call--->
export const createStaffAttendanceRequest = (data: any) => ({
  type: 'CREATE_STAFF_ATTENDANCE_REQUEST',
  payload: data,
});

export const createStaffAttendanceSuccess = (data: any) => ({
  type: 'CREATE_STAFF_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const createStaffAttendanceFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffAttendance = () => ({
  type: 'RESET_CREATE_STAFF_ATTENDANCE',
});

//Update Reducer Call--->
export const updateStaffAttendanceRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_ATTENDANCE_REQUEST',
  payload: { data, id },
});

export const updateStaffAttendanceSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_ATTENDANCE_SUCCESS',
  payload: { data },
});

export const updateStaffAttendanceFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_ATTENDANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffAttendance = () => ({
  type: 'RESET_UPDATE_STAFF_ATTENDANCE',
});
//Delete Reducer Call--->
// export const deleteStaffAttendanceRequest = ( id: string) => ({
//   type: 'DELETE_STAFF_ATTENDANCE_REQUEST',
//   payload: { id },
// });

// export const deleteStaffAttendanceSuccess = (data: any) => ({
//   type: 'DELETE_STAFF_ATTENDANCE_SUCCESS',
//   payload: { data },
// });

// export const deleteStaffAttendanceFailure = (errorMessage: string) => ({
//   type: 'DELETE_STAFF_ATTENDANCE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateStaffAttendance = () => ({
//   type: 'RESET_DELETE_STAFF_ATTENDANCE',
// });
