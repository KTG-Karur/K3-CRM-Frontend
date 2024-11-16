//Get Reducer Call--->
export const getActivityRequest = (params?: any) => ({
  type: 'GET_ACTIVITY_REQUEST',
  payload: params,
});

export const getActivitySuccess = (data: any) => ({
  type: 'GET_ACTIVITY_SUCCESS',
  payload: { data },
});

export const getActivityFailure = (errorMessage: string) => ({
  type: 'GET_ACTIVITY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetActivity = () => ({
  type: 'RESET_GET_ACTIVITY',
});

//Create Reducer Call--->
export const createActivityRequest = (data: any) => ({
  type: 'CREATE_ACTIVITY_REQUEST',
  payload: data,
});

export const createActivitySuccess = (data: any) => ({
  type: 'CREATE_ACTIVITY_SUCCESS',
  payload: { data },
});

export const createActivityFailure = (errorMessage: string) => ({
  type: 'CREATE_ACTIVITY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateActivity = () => ({
  type: 'RESET_CREATE_ACTIVITY',
});

//Update Reducer Call--->
export const updateActivityRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ACTIVITY_REQUEST',
  payload: { data, id },
});

export const updateActivitySuccess = (data: any) => ({
  type: 'UPDATE_ACTIVITY_SUCCESS',
  payload: { data },
});

export const updateActivityFailure = (errorMessage: string) => ({
  type: 'UPDATE_ACTIVITY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateActivity = () => ({
  type: 'RESET_UPDATE_ACTIVITY',
});
//Delete Reducer Call--->
export const deleteActivityRequest = ( id: string) => ({
  type: 'DELETE_ACTIVITY_REQUEST',
  payload: { id },
});

export const deleteActivitySuccess = (data: any) => ({
  type: 'DELETE_ACTIVITY_SUCCESS',
  payload: { data },
});

export const deleteActivityFailure = (errorMessage: string) => ({
  type: 'DELETE_ACTIVITY_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateActivity = () => ({
  type: 'RESET_DELETE_ACTIVITY',
});
