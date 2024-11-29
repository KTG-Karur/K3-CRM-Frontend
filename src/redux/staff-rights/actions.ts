//Get Reducer Call--->
export const getStaffRightsRequest = (params?: any) => ({
  type: 'GET_STAFF_RIGHTS_REQUEST',
  payload: params,
});

export const getStaffRightsSuccess = (data: any) => ({
  type: 'GET_STAFF_RIGHTS_SUCCESS',
  payload: { data },
});

export const getStaffRightsFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_RIGHTS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffRights = () => ({
  type: 'RESET_GET_STAFF_RIGHTS',
});

//Create Reducer Call--->
export const createStaffRightsRequest = (data: any) => ({
  type: 'CREATE_STAFF_RIGHTS_REQUEST',
  payload: data,
});

export const createStaffRightsSuccess = (data: any) => ({
  type: 'CREATE_STAFF_RIGHTS_SUCCESS',
  payload: { data },
});

export const createStaffRightsFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_RIGHTS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffRights = () => ({
  type: 'RESET_CREATE_STAFF_RIGHTS',
});

//Update Reducer Call--->
export const updateStaffRightsRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_RIGHTS_REQUEST',
  payload: { data, id },
});

export const updateStaffRightsSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_RIGHTS_SUCCESS',
  payload: { data },
});

export const updateStaffRightsFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_RIGHTS_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffRights = () => ({
  type: 'RESET_UPDATE_STAFF_RIGHTS',
});
//Delete Reducer Call--->
// export const deleteStaffRightsRequest = ( id: string) => ({
//   type: 'DELETE_STAFF_RIGHTS_REQUEST',
//   payload: { id },
// });

// export const deleteStaffRightsSuccess = (data: any) => ({
//   type: 'DELETE_STAFF_RIGHTS_SUCCESS',
//   payload: { data },
// });

// export const deleteStaffRightsFailure = (errorMessage: string) => ({
//   type: 'DELETE_STAFF_RIGHTS_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateStaffRights = () => ({
//   type: 'RESET_DELETE_STAFF_RIGHTS',
// });
