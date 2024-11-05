//Get Reducer Call--->
export const getSettingWorkingDayRequest = (params?: any) => ({
  type: 'GET_SETTING_WORKING_DAY_REQUEST',
  payload: params,
});

export const getSettingWorkingDaySuccess = (data: any) => ({
  type: 'GET_SETTING_WORKING_DAY_SUCCESS',
  payload: { data },
});

export const getSettingWorkingDayFailure = (errorMessage: string) => ({
  type: 'GET_SETTING_WORKING_DAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSettingWorkingDay = () => ({
  type: 'RESET_GET_SETTING_WORKING_DAY',
});

//Create Reducer Call--->
export const createSettingWorkingDayRequest = (data: any) => ({
  type: 'CREATE_SETTING_WORKING_DAY_REQUEST',
  payload: data,
});

export const createSettingWorkingDaySuccess = (data: any) => ({
  type: 'CREATE_SETTING_WORKING_DAY_SUCCESS',
  payload: { data },
});

export const createSettingWorkingDayFailure = (errorMessage: string) => ({
  type: 'CREATE_SETTING_WORKING_DAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSettingWorkingDay = () => ({
  type: 'RESET_CREATE_SETTING_WORKING_DAY',
});

//Update Reducer Call--->
export const updateSettingWorkingDayRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SETTING_WORKING_DAY_REQUEST',
  payload: { data, id },
});

export const updateSettingWorkingDaySuccess = (data: any) => ({
  type: 'UPDATE_SETTING_WORKING_DAY_SUCCESS',
  payload: { data },
});

export const updateSettingWorkingDayFailure = (errorMessage: string) => ({
  type: 'UPDATE_SETTING_WORKING_DAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSettingWorkingDay = () => ({
  type: 'RESET_UPDATE_SETTING_WORKING_DAY',
});
//Delete Reducer Call--->
// export const deleteSettingWorkingDayRequest = ( id: string) => ({
//   type: 'DELETE_SETTING_WORKING_DAY_REQUEST',
//   payload: { id },
// });

// export const deleteSettingWorkingDaySuccess = (data: any) => ({
//   type: 'DELETE_SETTING_WORKING_DAY_SUCCESS',
//   payload: { data },
// });

// export const deleteSettingWorkingDayFailure = (errorMessage: string) => ({
//   type: 'DELETE_SETTING_WORKING_DAY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateSettingWorkingDay = () => ({
//   type: 'RESET_DELETE_SETTING_WORKING_DAY',
// });
