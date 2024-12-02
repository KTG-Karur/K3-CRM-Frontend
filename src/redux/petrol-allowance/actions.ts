//Get Reducer Call--->
export const getPetrolAllowanceRequest = (params?: any) => ({
  type: 'GET_PETROL_ALLOWANCE_REQUEST',
  payload: params,
});

export const getPetrolAllowanceSuccess = (data: any) => ({
  type: 'GET_PETROL_ALLOWANCE_SUCCESS',
  payload: { data },
});

export const getPetrolAllowanceFailure = (errorMessage: string) => ({
  type: 'GET_PETROL_ALLOWANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetPetrolAllowance = () => ({
  type: 'RESET_GET_PETROL_ALLOWANCE',
});

//Get Report Reducer Call--->
export const getPetrolAllowanceReportRequest = (params?: any) => ({
  type: 'GET_PETROL_ALLOWANCE_REPORT_REQUEST',
  payload: params,
});

export const getPetrolAllowanceReportSuccess = (data: any) => ({
  type: 'GET_PETROL_ALLOWANCE_REPORT_SUCCESS',
  payload: { data },
});

export const getPetrolAllowanceReportFailure = (errorMessage: string) => ({
  type: 'GET_PETROL_ALLOWANCE_REPORT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetPetrolAllowanceReport = () => ({
  type: 'RESET_GET_PETROL_REPORT_ALLOWANCE',
});

//Create Reducer Call--->
export const createPetrolAllowanceRequest = (data: any) => ({
  type: 'CREATE_PETROL_ALLOWANCE_REQUEST',
  payload: data,
});

export const createPetrolAllowanceSuccess = (data: any) => ({
  type: 'CREATE_PETROL_ALLOWANCE_SUCCESS',
  payload: { data },
});

export const createPetrolAllowanceFailure = (errorMessage: string) => ({
  type: 'CREATE_PETROL_ALLOWANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreatePetrolAllowance = () => ({
  type: 'RESET_CREATE_PETROL_ALLOWANCE',
});

//Update Reducer Call--->
export const updatePetrolAllowanceRequest = ( data: any, id: string) => ({
  type: 'UPDATE_PETROL_ALLOWANCE_REQUEST',
  payload: { data, id },
});

export const updatePetrolAllowanceSuccess = (data: any) => ({
  type: 'UPDATE_PETROL_ALLOWANCE_SUCCESS',
  payload: { data },
});

export const updatePetrolAllowanceFailure = (errorMessage: string) => ({
  type: 'UPDATE_PETROL_ALLOWANCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdatePetrolAllowance = () => ({
  type: 'RESET_UPDATE_PETROL_ALLOWANCE',
});
//Delete Reducer Call--->
// export const deletePetrolAllowanceRequest = ( id: string) => ({
//   type: 'DELETE_PETROL_ALLOWANCE_REQUEST',
//   payload: { id },
// });

// export const deletePetrolAllowanceSuccess = (data: any) => ({
//   type: 'DELETE_PETROL_ALLOWANCE_SUCCESS',
//   payload: { data },
// });

// export const deletePetrolAllowanceFailure = (errorMessage: string) => ({
//   type: 'DELETE_PETROL_ALLOWANCE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdatePetrolAllowance = () => ({
//   type: 'RESET_DELETE_PETROL_ALLOWANCE',
// });
