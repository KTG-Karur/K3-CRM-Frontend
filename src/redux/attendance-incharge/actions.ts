//Get Reducer Call--->
export const getAttendanceInchargeRequest = (params?: any) => ({
  type: 'GET_ATTENDANCE_INCHARGE_REQUEST',
  payload: params,
});

export const getAttendanceInchargeSuccess = (data: any) => ({
  type: 'GET_ATTENDANCE_INCHARGE_SUCCESS',
  payload: { data },
});

export const getAttendanceInchargeFailure = (errorMessage: string) => ({
  type: 'GET_ATTENDANCE_INCHARGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetAttendanceIncharge = () => ({
  type: 'RESET_GET_ATTENDANCE_INCHARGE',
});

//Create Reducer Call--->
export const createAttendanceInchargeRequest = (data: any) => ({
  type: 'CREATE_ATTENDANCE_INCHARGE_REQUEST',
  payload: data,
});

export const createAttendanceInchargeSuccess = (data: any) => ({
  type: 'CREATE_ATTENDANCE_INCHARGE_SUCCESS',
  payload: { data },
});

export const createAttendanceInchargeFailure = (errorMessage: string) => ({
  type: 'CREATE_ATTENDANCE_INCHARGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateAttendanceIncharge = () => ({
  type: 'RESET_CREATE_ATTENDANCE_INCHARGE',
});

//Update Reducer Call--->
export const updateAttendanceInchargeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ATTENDANCE_INCHARGE_REQUEST',
  payload: { data, id },
});

export const updateAttendanceInchargeSuccess = (data: any) => ({
  type: 'UPDATE_ATTENDANCE_INCHARGE_SUCCESS',
  payload: { data },
});

export const updateAttendanceInchargeFailure = (errorMessage: string) => ({
  type: 'UPDATE_ATTENDANCE_INCHARGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateAttendanceIncharge = () => ({
  type: 'RESET_UPDATE_ATTENDANCE_INCHARGE',
});
//Delete Reducer Call--->
// export const deleteAttendanceInchargeRequest = ( id: string) => ({
//   type: 'DELETE_ATTENDANCE_INCHARGE_REQUEST',
//   payload: { id },
// });

// export const deleteAttendanceInchargeSuccess = (data: any) => ({
//   type: 'DELETE_ATTENDANCE_INCHARGE_SUCCESS',
//   payload: { data },
// });

// export const deleteAttendanceInchargeFailure = (errorMessage: string) => ({
//   type: 'DELETE_ATTENDANCE_INCHARGE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateAttendanceIncharge = () => ({
//   type: 'RESET_DELETE_ATTENDANCE_INCHARGE',
// });
