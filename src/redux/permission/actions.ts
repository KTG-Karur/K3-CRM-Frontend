//Get Reducer Call--->
export const getPermissionRequest = (params?: any) => ({
  type: 'GET_PERMISSION_REQUEST',
  payload: params,
});

export const getPermissionSuccess = (data: any) => ({
  type: 'GET_PERMISSION_SUCCESS',
  payload: { data },
});

export const getPermissionFailure = (errorMessage: string) => ({
  type: 'GET_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetPermission = () => ({
  type: 'RESET_GET_PERMISSION',
});

//Create Reducer Call--->
export const createPermissionRequest = (data: any) => ({
  type: 'CREATE_PERMISSION_REQUEST',
  payload: data,
});

export const createPermissionSuccess = (data: any) => ({
  type: 'CREATE_PERMISSION_SUCCESS',
  payload: { data },
});

export const createPermissionFailure = (errorMessage: string) => ({
  type: 'CREATE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreatePermission = () => ({
  type: 'RESET_CREATE_PERMISSION',
});

//Update Reducer Call--->
export const updatePermissionRequest = ( data: any, id: string) => ({
  type: 'UPDATE_PERMISSION_REQUEST',
  payload: { data, id },
});

export const updatePermissionSuccess = (data: any) => ({
  type: 'UPDATE_PERMISSION_SUCCESS',
  payload: { data },
});

export const updatePermissionFailure = (errorMessage: string) => ({
  type: 'UPDATE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdatePermission = () => ({
  type: 'RESET_UPDATE_PERMISSION',
});
//Delete Reducer Call--->
export const deletePermissionRequest = ( id: string) => ({
  type: 'DELETE_PERMISSION_REQUEST',
  payload: { id },
});

export const deletePermissionSuccess = (data: any) => ({
  type: 'DELETE_PERMISSION_SUCCESS',
  payload: { data },
});

export const deletePermissionFailure = (errorMessage: string) => ({
  type: 'DELETE_PERMISSION_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdatePermission = () => ({
  type: 'RESET_DELETE_PERMISSION',
});
