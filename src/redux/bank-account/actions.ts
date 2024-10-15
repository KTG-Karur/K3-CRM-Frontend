//Get Reducer Call--->
export const getBankAccountRequest = (params?: any) => ({
  type: 'GET_BANK_ACCOUNT_REQUEST',
  payload: params,
});

export const getBankAccountSuccess = (data: any) => ({
  type: 'GET_BANK_ACCOUNT_SUCCESS',
  payload: { data },
});

export const getBankAccountFailure = (errorMessage: string) => ({
  type: 'GET_BANK_ACCOUNT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetBankAccount = () => ({
  type: 'RESET_GET_BANK_ACCOUNT',
});

//Create Reducer Call--->
export const createBankAccountRequest = (data: any) => ({
  type: 'CREATE_BANK_ACCOUNT_REQUEST',
  payload: data,
});

export const createBankAccountSuccess = (data: any) => ({
  type: 'CREATE_BANK_ACCOUNT_SUCCESS',
  payload: { data },
});

export const createBankAccountFailure = (errorMessage: string) => ({
  type: 'CREATE_BANK_ACCOUNT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateBankAccount = () => ({
  type: 'RESET_CREATE_BANK_ACCOUNT',
});

//Update Reducer Call--->
export const updateBankAccountRequest = ( data: any, id: string) => ({
  type: 'UPDATE_BANK_ACCOUNT_REQUEST',
  payload: { data, id },
});

export const updateBankAccountSuccess = (data: any) => ({
  type: 'UPDATE_BANK_ACCOUNT_SUCCESS',
  payload: { data },
});

export const updateBankAccountFailure = (errorMessage: string) => ({
  type: 'UPDATE_BANK_ACCOUNT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateBankAccount = () => ({
  type: 'RESET_UPDATE_BANK_ACCOUNT',
});
//Delete Reducer Call--->
// export const deleteBankAccountRequest = ( id: string) => ({
//   type: 'DELETE_BANK_ACCOUNT_REQUEST',
//   payload: { id },
// });

// export const deleteBankAccountSuccess = (data: any) => ({
//   type: 'DELETE_BANK_ACCOUNT_SUCCESS',
//   payload: { data },
// });

// export const deleteBankAccountFailure = (errorMessage: string) => ({
//   type: 'DELETE_BANK_ACCOUNT_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateBankAccount = () => ({
//   type: 'RESET_DELETE_BANK_ACCOUNT',
// });
