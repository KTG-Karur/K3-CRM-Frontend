//Get Reducer Call--->
export const getSettingLeaveDeductionRequest = (params?: any) => ({
  type: 'GET_SETTING_LEAVE_DEDUCTION_REQUEST',
  payload: params,
});

export const getSettingLeaveDeductionSuccess = (data: any) => ({
  type: 'GET_SETTING_LEAVE_DEDUCTION_SUCCESS',
  payload: { data },
});

export const getSettingLeaveDeductionFailure = (errorMessage: string) => ({
  type: 'GET_SETTING_LEAVE_DEDUCTION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetSettingLeaveDeduction = () => ({
  type: 'RESET_GET_SETTING_LEAVE_DEDUCTION',
});

//Create Reducer Call--->
export const createSettingLeaveDeductionRequest = (data: any) => ({
  type: 'CREATE_SETTING_LEAVE_DEDUCTION_REQUEST',
  payload: data,
});

export const createSettingLeaveDeductionSuccess = (data: any) => ({
  type: 'CREATE_SETTING_LEAVE_DEDUCTION_SUCCESS',
  payload: { data },
});

export const createSettingLeaveDeductionFailure = (errorMessage: string) => ({
  type: 'CREATE_SETTING_LEAVE_DEDUCTION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateSettingLeaveDeduction = () => ({
  type: 'RESET_CREATE_SETTING_LEAVE_DEDUCTION',
});

//Update Reducer Call--->
export const updateSettingLeaveDeductionRequest = ( data: any, id: string) => ({
  type: 'UPDATE_SETTING_LEAVE_DEDUCTION_REQUEST',
  payload: { data, id },
});

export const updateSettingLeaveDeductionSuccess = (data: any) => ({
  type: 'UPDATE_SETTING_LEAVE_DEDUCTION_SUCCESS',
  payload: { data },
});

export const updateSettingLeaveDeductionFailure = (errorMessage: string) => ({
  type: 'UPDATE_SETTING_LEAVE_DEDUCTION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateSettingLeaveDeduction = () => ({
  type: 'RESET_UPDATE_SETTING_LEAVE_DEDUCTION',
});
//Delete Reducer Call--->
// export const deleteSettingLeaveDeductionRequest = ( id: string) => ({
//   type: 'DELETE_SETTING_LEAVE_DEDUCTION_REQUEST',
//   payload: { id },
// });

// export const deleteSettingLeaveDeductionSuccess = (data: any) => ({
//   type: 'DELETE_SETTING_LEAVE_DEDUCTION_SUCCESS',
//   payload: { data },
// });

// export const deleteSettingLeaveDeductionFailure = (errorMessage: string) => ({
//   type: 'DELETE_SETTING_LEAVE_DEDUCTION_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateSettingLeaveDeduction = () => ({
//   type: 'RESET_DELETE_SETTING_LEAVE_DEDUCTION',
// });
