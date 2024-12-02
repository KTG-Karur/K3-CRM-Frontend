//Get Reducer Call--->
export const getStaffAdvanceRequest = (params?: any) => ({
  type: 'GET_STAFF_ADVANCE_REQUEST',
  payload: params,
});

export const getStaffAdvanceSuccess = (data: any) => ({
  type: 'GET_STAFF_ADVANCE_SUCCESS',
  payload: { data },
});

export const getStaffAdvanceFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_ADVANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffAdvance = () => ({
  type: 'RESET_GET_STAFF_ADVANCE',
});

//Create Reducer Call--->
export const createStaffAdvanceRequest = (data: any) => ({
  type: 'CREATE_STAFF_ADVANCE_REQUEST',
  payload: data,
});

export const createStaffAdvanceSuccess = (data: any) => ({
  type: 'CREATE_STAFF_ADVANCE_SUCCESS',
  payload: { data },
});

export const createStaffAdvanceFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_ADVANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffAdvance = () => ({
  type: 'RESET_CREATE_STAFF_ADVANCE',
});

//Update Reducer Call--->
export const updateStaffAdvanceRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_ADVANCE_REQUEST',
  payload: { data, id },
});

export const updateStaffAdvanceSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_ADVANCE_SUCCESS',
  payload: { data },
});

export const updateStaffAdvanceFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_ADVANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffAdvance = () => ({
  type: 'RESET_UPDATE_STAFF_ADVANCE',
});
//Delete Reducer Call--->
// export const deleteStaffAdvanceRequest = ( id: string) => ({
//   type: 'DELETE_STAFF_ADVANCE_REQUEST',
//   payload: { id },
// });

// export const deleteStaffAdvanceSuccess = (data: any) => ({
//   type: 'DELETE_STAFF_ADVANCE_SUCCESS',
//   payload: { data },
// });

// export const deleteStaffAdvanceFailure = (errorMessage: string) => ({
//   type: 'DELETE_STAFF_ADVANCE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateStaffAdvance = () => ({
//   type: 'RESET_DELETE_STAFF_ADVANCE',
// });
