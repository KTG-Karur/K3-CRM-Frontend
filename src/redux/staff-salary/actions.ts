//Get Reducer Call--->
export const getStaffSalaryRequest = (params?: any) => ({
  type: 'GET_STAFFSALARY_REQUEST',
  payload: params,
});

export const getStaffSalarySuccess = (data: any) => ({
  type: 'GET_STAFFSALARY_SUCCESS',
  payload: { data },
});

export const getStaffSalaryFailure = (errorMessage: string) => ({
  type: 'GET_STAFFSALARY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffSalary = () => ({
  type: 'RESET_GET_STAFFSALARY',
});

//Get Reducer Call--->
export const getStaffSalaryDetailRequest = (params?: any) => ({
  type: 'GET_STAFFSALARY_DETAIL_REQUEST',
  payload: params,
});

export const getStaffSalaryDetailSuccess = (data: any) => ({
  type: 'GET_STAFFSALARY_DETAIL_SUCCESS',
  payload: { data },
});

export const getStaffSalaryDetailFailure = (errorMessage: string) => ({
  type: 'GET_STAFFSALARY_DETAIL_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffSalaryDetail = () => ({
  type: 'RESET_GET_STAFFSALARY_DETAIL',
});

//Create Reducer Call--->
export const createStaffSalaryRequest = (data: any) => ({
  type: 'CREATE_STAFFSALARY_REQUEST',
  payload: data,
});

export const createStaffSalarySuccess = (data: any) => ({
  type: 'CREATE_STAFFSALARY_SUCCESS',
  payload: { data },
});

export const createStaffSalaryFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFFSALARY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffSalary = () => ({
  type: 'RESET_CREATE_STAFFSALARY',
});

//Update Reducer Call--->
export const updateStaffSalaryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFFSALARY_REQUEST',
  payload: { data, id },
});

export const updateStaffSalarySuccess = (data: any) => ({
  type: 'UPDATE_STAFFSALARY_SUCCESS',
  payload: { data },
});

export const updateStaffSalaryFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFFSALARY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffSalary = () => ({
  type: 'RESET_UPDATE_STAFFSALARY',
});
//Delete Reducer Call--->
export const deleteStaffSalaryRequest = ( id: string) => ({
  type: 'DELETE_STAFFSALARY_REQUEST',
  payload: { id },
});

export const deleteStaffSalarySuccess = (data: any) => ({
  type: 'DELETE_STAFFSALARY_SUCCESS',
  payload: { data },
});

export const deleteStaffSalaryFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFFSALARY_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffSalary = () => ({
  type: 'RESET_DELETE_STAFFSALARY',
});
