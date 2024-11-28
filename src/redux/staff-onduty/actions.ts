//Get Reducer Call--->
export const getStaffOnDutyRequest = (params?: any) => ({
  type: 'GET_STAFF_ON_DUTY_REQUEST',
  payload: params,
});

export const getStaffOnDutySuccess = (data: any) => ({
  type: 'GET_STAFF_ON_DUTY_SUCCESS',
  payload: { data },
});

export const getStaffOnDutyFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_ON_DUTY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffOnDuty = () => ({
  type: 'RESET_GET_STAFF_ON_DUTY',
});

//Create Reducer Call--->
export const createStaffOnDutyRequest = (data: any) => ({
  type: 'CREATE_STAFF_ON_DUTY_REQUEST',
  payload: data,
});

export const createStaffOnDutySuccess = (data: any) => ({
  type: 'CREATE_STAFF_ON_DUTY_SUCCESS',
  payload: { data },
});

export const createStaffOnDutyFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_ON_DUTY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffOnDuty = () => ({
  type: 'RESET_CREATE_STAFF_ON_DUTY',
});

//Update Reducer Call--->
export const updateStaffOnDutyRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_ON_DUTY_REQUEST',
  payload: { data, id },
});

export const updateStaffOnDutySuccess = (data: any) => ({
  type: 'UPDATE_STAFF_ON_DUTY_SUCCESS',
  payload: { data },
});

export const updateStaffOnDutyFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_ON_DUTY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffOnDuty = () => ({
  type: 'RESET_UPDATE_STAFF_ON_DUTY',
});
//Delete Reducer Call--->
// export const deleteStaffOnDutyRequest = ( id: string) => ({
//   type: 'DELETE_STAFF_ON_DUTY_REQUEST',
//   payload: { id },
// });

// export const deleteStaffOnDutySuccess = (data: any) => ({
//   type: 'DELETE_STAFF_ON_DUTY_SUCCESS',
//   payload: { data },
// });

// export const deleteStaffOnDutyFailure = (errorMessage: string) => ({
//   type: 'DELETE_STAFF_ON_DUTY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateStaffOnDuty = () => ({
//   type: 'RESET_DELETE_STAFF_ON_DUTY',
// });
