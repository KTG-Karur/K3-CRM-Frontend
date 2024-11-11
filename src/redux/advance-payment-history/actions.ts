//Get Reducer Call--->
export const getAdvancePaymentHistoryRequest = (params?: any) => ({
  type: 'GET_ADVANCE_PAYMENT_HISTORY_REQUEST',
  payload: params,
});

export const getAdvancePaymentHistorySuccess = (data: any) => ({
  type: 'GET_ADVANCE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const getAdvancePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'GET_ADVANCE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetAdvancePaymentHistory = () => ({
  type: 'RESET_GET_ADVANCE_PAYMENT_HISTORY',
});

//Create Reducer Call--->
export const createAdvancePaymentHistoryRequest = (data: any) => ({
  type: 'CREATE_ADVANCE_PAYMENT_HISTORY_REQUEST',
  payload: data,
});

export const createAdvancePaymentHistorySuccess = (data: any) => ({
  type: 'CREATE_ADVANCE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const createAdvancePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'CREATE_ADVANCE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateAdvancePaymentHistory = () => ({
  type: 'RESET_CREATE_ADVANCE_PAYMENT_HISTORY',
});

//Update Reducer Call--->
export const updateAdvancePaymentHistoryRequest = ( data: any, id: string) => ({
  type: 'UPDATE_ADVANCE_PAYMENT_HISTORY_REQUEST',
  payload: { data, id },
});

export const updateAdvancePaymentHistorySuccess = (data: any) => ({
  type: 'UPDATE_ADVANCE_PAYMENT_HISTORY_SUCCESS',
  payload: { data },
});

export const updateAdvancePaymentHistoryFailure = (errorMessage: string) => ({
  type: 'UPDATE_ADVANCE_PAYMENT_HISTORY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateAdvancePaymentHistory = () => ({
  type: 'RESET_UPDATE_ADVANCE_PAYMENT_HISTORY',
});
//Delete Reducer Call--->
// export const deleteAdvancePaymentHistoryRequest = ( id: string) => ({
//   type: 'DELETE_ADVANCE_PAYMENT_HISTORY_REQUEST',
//   payload: { id },
// });

// export const deleteAdvancePaymentHistorySuccess = (data: any) => ({
//   type: 'DELETE_ADVANCE_PAYMENT_HISTORY_SUCCESS',
//   payload: { data },
// });

// export const deleteAdvancePaymentHistoryFailure = (errorMessage: string) => ({
//   type: 'DELETE_ADVANCE_PAYMENT_HISTORY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateAdvancePaymentHistory = () => ({
//   type: 'RESET_DELETE_ADVANCE_PAYMENT_HISTORY',
// });
