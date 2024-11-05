//Get Reducer Call--->
export const getSettingBenefitRequest = (params?: any) => ({
  type: 'GET_SETTING_BENEFIT_REQUEST',
  payload: params,
});

export const getSettingBenefitSuccess = (data: any) => ({
  type: 'GET_SETTING_BENEFIT_SUCCESS',
  payload: { data },
});

export const getSettingBenefitFailure = (errorMessage: string) => ({
  type: 'GET_SETTING_BENEFIT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSettingBenefit = () => ({
  type: 'RESET_GET_SETTING_BENEFIT',
});

//Create Reducer Call--->
export const createSettingBenefitRequest = (data: any) => ({
  type: 'CREATE_SETTING_BENEFIT_REQUEST',
  payload: data,
});

export const createSettingBenefitSuccess = (data: any) => ({
  type: 'CREATE_SETTING_BENEFIT_SUCCESS',
  payload: { data },
});

export const createSettingBenefitFailure = (errorMessage: string) => ({
  type: 'CREATE_SETTING_BENEFIT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSettingBenefit = () => ({
  type: 'RESET_CREATE_SETTING_BENEFIT',
});

//Update Reducer Call--->
export const updateSettingBenefitRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SETTING_BENEFIT_REQUEST',
  payload: { data, id },
});

export const updateSettingBenefitSuccess = (data: any) => ({
  type: 'UPDATE_SETTING_BENEFIT_SUCCESS',
  payload: { data },
});

export const updateSettingBenefitFailure = (errorMessage: string) => ({
  type: 'UPDATE_SETTING_BENEFIT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSettingBenefit = () => ({
  type: 'RESET_UPDATE_SETTING_BENEFIT',
});
//Delete Reducer Call--->
// export const deleteSettingBenefitRequest = ( id: string) => ({
//   type: 'DELETE_SETTING_BENEFIT_REQUEST',
//   payload: { id },
// });

// export const deleteSettingBenefitSuccess = (data: any) => ({
//   type: 'DELETE_SETTING_BENEFIT_SUCCESS',
//   payload: { data },
// });

// export const deleteSettingBenefitFailure = (errorMessage: string) => ({
//   type: 'DELETE_SETTING_BENEFIT_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateSettingBenefit = () => ({
//   type: 'RESET_DELETE_SETTING_BENEFIT',
// });
