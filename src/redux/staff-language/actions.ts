//Get Reducer Call--->
export const getStaffLanguageRequest = (params?: any) => ({
  type: 'GET_STAFF_LANGUAGE_REQUEST',
  payload: params,
});

export const getStaffLanguageSuccess = (data: any) => ({
  type: 'GET_STAFF_LANGUAGE_SUCCESS',
  payload: { data },
});

export const getStaffLanguageFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_LANGUAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffLanguage = () => ({
  type: 'RESET_GET_STAFF_LANGUAGE',
});

//Create Reducer Call--->
export const createStaffLanguageRequest = (data: any) => ({
  type: 'CREATE_STAFF_LANGUAGE_REQUEST',
  payload: data,
});

export const createStaffLanguageSuccess = (data: any) => ({
  type: 'CREATE_STAFF_LANGUAGE_SUCCESS',
  payload: { data },
});

export const createStaffLanguageFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_LANGUAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffLanguage = () => ({
  type: 'RESET_CREATE_STAFF_LANGUAGE',
});

//Update Reducer Call--->
export const updateStaffLanguageRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_LANGUAGE_REQUEST',
  payload: { data, id },
});

export const updateStaffLanguageSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_LANGUAGE_SUCCESS',
  payload: { data },
});

export const updateStaffLanguageFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_LANGUAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffLanguage = () => ({
  type: 'RESET_UPDATE_STAFF_LANGUAGE',
});
//Delete Reducer Call--->
export const deleteStaffLanguageRequest = ( id: string) => ({
  type: 'DELETE_STAFF_LANGUAGE_REQUEST',
  payload: { id },
});

export const deleteStaffLanguageSuccess = (data: any) => ({
  type: 'DELETE_STAFF_LANGUAGE_SUCCESS',
  payload: { data },
});

export const deleteStaffLanguageFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_LANGUAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffLanguage = () => ({
  type: 'RESET_DELETE_STAFF_LANGUAGE',
});
