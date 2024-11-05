//Get Reducer Call--->
export const getStaffLeaveRequest = (params?: any) => ({
  type: 'GET_STAFF_LEAVE_REQUEST',
  payload: params,
});

export const getStaffLeaveSuccess = (data: any) => ({
  type: 'GET_STAFF_LEAVE_SUCCESS',
  payload: { data },
});

export const getStaffLeaveFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_LEAVE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffLeave = () => ({
  type: 'RESET_GET_STAFF_LEAVE',
});

//Create Reducer Call--->
export const createStaffLeaveRequest = (data: any) => ({
  type: 'CREATE_STAFF_LEAVE_REQUEST',
  payload: data,
});

export const createStaffLeaveSuccess = (data: any) => ({
  type: 'CREATE_STAFF_LEAVE_SUCCESS',
  payload: { data },
});

export const createStaffLeaveFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_LEAVE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffLeave = () => ({
  type: 'RESET_CREATE_STAFF_LEAVE',
});

//Update Reducer Call--->
export const updateStaffLeaveRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_LEAVE_REQUEST',
  payload: { data, id },
});

export const updateStaffLeaveSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_LEAVE_SUCCESS',
  payload: { data },
});

export const updateStaffLeaveFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_LEAVE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffLeave = () => ({
  type: 'RESET_UPDATE_STAFF_LEAVE',
});
//Delete Reducer Call--->
// export const deleteStaffLeaveRequest = ( id: string) => ({
//   type: 'DELETE_STAFF_LEAVE_REQUEST',
//   payload: { id },
// });

// export const deleteStaffLeaveSuccess = (data: any) => ({
//   type: 'DELETE_STAFF_LEAVE_SUCCESS',
//   payload: { data },
// });

// export const deleteStaffLeaveFailure = (errorMessage: string) => ({
//   type: 'DELETE_STAFF_LEAVE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateStaffLeave = () => ({
//   type: 'RESET_DELETE_STAFF_LEAVE',
// });
