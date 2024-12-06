//Get Reducer Call--->
export const getSalaryIncreamentHistoryRequest = (params?: any) => ({
  type: 'GET_SALARY_INCREAMENT_HISTORY_REQUEST',
  payload: params,
});

export const getSalaryIncreamentHistorySuccess = (data: any) => ({
  type: 'GET_SALARY_INCREAMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const getSalaryIncreamentHistoryFailure = (errorMessage: string) => ({
  type: 'GET_SALARY_INCREAMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSalaryIncreamentHistory = () => ({
  type: 'RESET_GET_SALARY_INCREAMENT_HISTORY',
});

//Create Reducer Call--->
export const createSalaryIncreamentHistoryRequest = (data: any) => ({
  type: 'CREATE_SALARY_INCREAMENT_HISTORY_REQUEST',
  payload: data,
});

export const createSalaryIncreamentHistorySuccess = (data: any) => ({
  type: 'CREATE_SALARY_INCREAMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const createSalaryIncreamentHistoryFailure = (errorMessage: string) => ({
  type: 'CREATE_SALARY_INCREAMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSalaryIncreamentHistory = () => ({
  type: 'RESET_CREATE_SALARY_INCREAMENT_HISTORY',
});

//Update Reducer Call--->
export const updateSalaryIncreamentHistoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SALARY_INCREAMENT_HISTORY_REQUEST',
  payload: { data, id },
});

export const updateSalaryIncreamentHistorySuccess = (data: any) => ({
  type: 'UPDATE_SALARY_INCREAMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const updateSalaryIncreamentHistoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_SALARY_INCREAMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSalaryIncreamentHistory = () => ({
  type: 'RESET_UPDATE_SALARY_INCREAMENT_HISTORY',
});
//Delete Reducer Call--->
export const deleteSalaryIncreamentHistoryRequest = ( id: string) => ({
  type: 'DELETE_SALARY_INCREAMENT_HISTORY_REQUEST',
  payload: { id },
});

export const deleteSalaryIncreamentHistorySuccess = (data: any) => ({
  type: 'DELETE_SALARY_INCREAMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const deleteSalaryIncreamentHistoryFailure = (errorMessage: string) => ({
  type: 'DELETE_SALARY_INCREAMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateSalaryIncreamentHistory = () => ({
  type: 'RESET_DELETE_SALARY_INCREAMENT_HISTORY',
});
