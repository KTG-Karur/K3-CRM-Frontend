
// get user rights
export const getUserRightsRequest = (id: string) => ({
  type: 'GET_USER_RIGHTS_REQUEST',
  payload: { id },
});

export const getUserRightsSuccess = (data: any) => ({
  type: 'GET_USER_RIGHTS_SUCCESS',
  payload: { data },
});

export const getUserRightsFailure = (data: string) => ({
  type: 'GET_USER_RIGHTS_FAILURE',
  payload: { data },
});

export const resetGetUserRights = () => ({
  type: 'RESET_GET_USER_RIGHTS',
});

// create user rights
export const createUserRightsRequest = (data: any) => ({
  type: 'CREATE_USER_RIGHTS_REQUEST',
  payload: data,
});

export const createUserRightsSuccess = (data: any) => ({
  type: 'CREATE_USER_RIGHTS_SUCCESS',
  payload: { data },
});

export const createUserRightsFailure = (data: string) => ({
  type: 'CREATE_USER_RIGHTS_FAILURE',
  payload: { data },
});

export const resetCreateUserRights = () => ({
  type: 'RESET_CREATE_USER_RIGHTS',
});


