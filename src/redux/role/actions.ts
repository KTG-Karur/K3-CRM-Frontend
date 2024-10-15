//Get Reducer Call--->
export const getRoleRequest = (params?: any) => ({
  type: 'GET_ROLE_REQUEST',
  payload: params,
});

export const getRoleSuccess = (data: any) => ({
  type: 'GET_ROLE_SUCCESS',
  payload: { data },
});

export const getRoleFailure = (errorMessage: string) => ({
  type: 'GET_ROLE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetRole = () => ({
  type: 'RESET_GET_ROLE',
});

//Create Reducer Call--->
export const createRoleRequest = (data: any) => ({
  type: 'CREATE_ROLE_REQUEST',
  payload: data,
});

export const createRoleSuccess = (data: any) => ({
  type: 'CREATE_ROLE_SUCCESS',
  payload: { data },
});

export const createRoleFailure = (errorMessage: string) => ({
  type: 'CREATE_ROLE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateRole = () => ({
  type: 'RESET_CREATE_ROLE',
});

//Update Reducer Call--->
export const updateRoleRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ROLE_REQUEST',
  payload: { data, id },
});

export const updateRoleSuccess = (data: any) => ({
  type: 'UPDATE_ROLE_SUCCESS',
  payload: { data },
});

export const updateRoleFailure = (errorMessage: string) => ({
  type: 'UPDATE_ROLE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateRole = () => ({
  type: 'RESET_UPDATE_ROLE',
});
//Delete Reducer Call--->
// export const deleteRoleRequest = ( id: string) => ({
//   type: 'DELETE_ROLE_REQUEST',
//   payload: { id },
// });

// export const deleteRoleSuccess = (data: any) => ({
//   type: 'DELETE_ROLE_SUCCESS',
//   payload: { data },
// });

// export const deleteRoleFailure = (errorMessage: string) => ({
//   type: 'DELETE_ROLE_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateRole = () => ({
//   type: 'RESET_DELETE_ROLE',
// });
