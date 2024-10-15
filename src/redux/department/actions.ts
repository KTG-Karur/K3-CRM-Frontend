//Get Reducer Call--->
export const getDepartmentRequest = (params?: any) => ({
  type: 'GET_DEPARTMENT_REQUEST',
  payload: params,
});

export const getDepartmentSuccess = (data: any) => ({
  type: 'GET_DEPARTMENT_SUCCESS',
  payload: { data },
});

export const getDepartmentFailure = (errorMessage: string) => ({
  type: 'GET_DEPARTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDepartment = () => ({
  type: 'RESET_GET_DEPARTMENT',
});

//Create Reducer Call--->
export const createDepartmentRequest = (data: any) => ({
  type: 'CREATE_DEPARTMENT_REQUEST',
  payload: data,
});

export const createDepartmentSuccess = (data: any) => ({
  type: 'CREATE_DEPARTMENT_SUCCESS',
  payload: { data },
});

export const createDepartmentFailure = (errorMessage: string) => ({
  type: 'CREATE_DEPARTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDepartment = () => ({
  type: 'RESET_CREATE_DEPARTMENT',
});

//Update Reducer Call--->
export const updateDepartmentRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DEPARTMENT_REQUEST',
  payload: { data, id },
});

export const updateDepartmentSuccess = (data: any) => ({
  type: 'UPDATE_DEPARTMENT_SUCCESS',
  payload: { data },
});

export const updateDepartmentFailure = (errorMessage: string) => ({
  type: 'UPDATE_DEPARTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDepartment = () => ({
  type: 'RESET_UPDATE_DEPARTMENT',
});
//Delete Reducer Call--->
export const deleteDepartmentRequest = ( id: string) => ({
  type: 'DELETE_DEPARTMENT_REQUEST',
  payload: { id },
});

export const deleteDepartmentSuccess = (data: any) => ({
  type: 'DELETE_DEPARTMENT_SUCCESS',
  payload: { data },
});

export const deleteDepartmentFailure = (errorMessage: string) => ({
  type: 'DELETE_DEPARTMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateDepartment = () => ({
  type: 'RESET_DELETE_DEPARTMENT',
});
