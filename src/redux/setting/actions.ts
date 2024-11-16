//Get Reducer Call--->
export const getSettingRequest = (params?: any) => ({
  type: 'GET_SETTING_REQUEST',
  payload: params,
});

export const getSettingSuccess = (data: any) => ({
  type: 'GET_SETTING_SUCCESS',
  payload: { data },
});

export const getSettingFailure = (errorMessage: string) => ({
  type: 'GET_SETTING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSetting = () => ({
  type: 'RESET_GET_SETTING',
});

//Create Reducer Call--->
export const createSettingRequest = (data: any) => ({
  type: 'CREATE_SETTING_REQUEST',
  payload: data,
});

export const createSettingSuccess = (data: any) => ({
  type: 'CREATE_SETTING_SUCCESS',
  payload: { data },
});

export const createSettingFailure = (errorMessage: string) => ({
  type: 'CREATE_SETTING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSetting = () => ({
  type: 'RESET_CREATE_SETTING',
});

//Update Reducer Call--->
export const updateSettingRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SETTING_REQUEST',
  payload: { data, id },
});

export const updateSettingSuccess = (data: any) => ({
  type: 'UPDATE_SETTING_SUCCESS',
  payload: { data },
});

export const updateSettingFailure = (errorMessage: string) => ({
  type: 'UPDATE_SETTING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSetting = () => ({
  type: 'RESET_UPDATE_SETTING',
});
//Delete Reducer Call--->
export const deleteSettingRequest = ( id: string) => ({
  type: 'DELETE_SETTING_REQUEST',
  payload: { id },
});

export const deleteSettingSuccess = (data: any) => ({
  type: 'DELETE_SETTING_SUCCESS',
  payload: { data },
});

export const deleteSettingFailure = (errorMessage: string) => ({
  type: 'DELETE_SETTING_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateSetting = () => ({
  type: 'RESET_DELETE_SETTING',
});
