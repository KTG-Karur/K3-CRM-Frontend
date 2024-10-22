//Get Reducer Call--->
export const getTransferStaffRequest = (params?: any) => ({
  type: 'GET_TRANSFER_STAFF_REQUEST',
  payload: params,
});

export const getTransferStaffSuccess = (data: any) => ({
  type: 'GET_TRANSFER_STAFF_SUCCESS',
  payload: { data },
});

export const getTransferStaffFailure = (errorMessage: string) => ({
  type: 'GET_TRANSFER_STAFF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetTransferStaff = () => ({
  type: 'RESET_GET_TRANSFER_STAFF',
});

//Create Reducer Call--->
export const createTransferStaffRequest = (data: any) => ({
  type: 'CREATE_TRANSFER_STAFF_REQUEST',
  payload: data,
});

export const createTransferStaffSuccess = (data: any) => ({
  type: 'CREATE_TRANSFER_STAFF_SUCCESS',
  payload: { data },
});

export const createTransferStaffFailure = (errorMessage: string) => ({
  type: 'CREATE_TRANSFER_STAFF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateTransferStaff = () => ({
  type: 'RESET_CREATE_TRANSFER_STAFF',
});

//Update Reducer Call--->
export const updateTransferStaffRequest = ( data: any, id: string) => ({
  type: 'UPDATE_TRANSFER_STAFF_REQUEST',
  payload: { data, id },
});

export const updateTransferStaffSuccess = (data: any) => ({
  type: 'UPDATE_TRANSFER_STAFF_SUCCESS',
  payload: { data },
});

export const updateTransferStaffFailure = (errorMessage: string) => ({
  type: 'UPDATE_TRANSFER_STAFF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateTransferStaff = () => ({
  type: 'RESET_UPDATE_TRANSFER_STAFF',
});
//Delete Reducer Call--->
// export const deleteTransferStaffRequest = ( id: string) => ({
//   type: 'DELETE_TRANSFER_STAFF_REQUEST',
//   payload: { id },
// });

// export const deleteTransferStaffSuccess = (data: any) => ({
//   type: 'DELETE_TRANSFER_STAFF_SUCCESS',
//   payload: { data },
// });

// export const deleteTransferStaffFailure = (errorMessage: string) => ({
//   type: 'DELETE_TRANSFER_STAFF_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateTransferStaff = () => ({
//   type: 'RESET_DELETE_TRANSFER_STAFF',
// });
