//Get Reducer Call--->
export const getRolePermissionRequest = (params?: any) => ({
  type: 'GET_ROLE_PERMISSION_REQUEST',
  payload: params,
});

export const getRolePermissionSuccess = (data: any) => ({
  type: 'GET_ROLE_PERMISSION_SUCCESS',
  payload: { data },
});

export const getRolePermissionFailure = (errorMessage: string) => ({
  type: 'GET_ROLE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetRolePermission = () => ({
  type: 'RESET_GET_ROLE_PERMISSION',
});

//Create Reducer Call--->
export const createRolePermissionRequest = (data: any) => ({
  type: 'CREATE_ROLE_PERMISSION_REQUEST',
  payload: data,
});

export const createRolePermissionSuccess = (data: any) => ({
  type: 'CREATE_ROLE_PERMISSION_SUCCESS',
  payload: { data },
});

export const createRolePermissionFailure = (errorMessage: string) => ({
  type: 'CREATE_ROLE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateRolePermission = () => ({
  type: 'RESET_CREATE_ROLE_PERMISSION',
});

//Update Reducer Call--->
export const updateRolePermissionRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ROLE_PERMISSION_REQUEST',
  payload: { data, id },
});

export const updateRolePermissionSuccess = (data: any) => ({
  type: 'UPDATE_ROLE_PERMISSION_SUCCESS',
  payload: { data },
});

export const updateRolePermissionFailure = (errorMessage: string) => ({
  type: 'UPDATE_ROLE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateRolePermission = () => ({
  type: 'RESET_UPDATE_ROLE_PERMISSION',
});
//Delete Reducer Call--->
export const deleteRolePermissionRequest = ( id: string) => ({
  type: 'DELETE_ROLE_PERMISSION_REQUEST',
  payload: { id },
});

export const deleteRolePermissionSuccess = (data: any) => ({
  type: 'DELETE_ROLE_PERMISSION_SUCCESS',
  payload: { data },
});

export const deleteRolePermissionFailure = (errorMessage: string) => ({
  type: 'DELETE_ROLE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateRolePermission = () => ({
  type: 'RESET_DELETE_ROLE_PERMISSION',
});
