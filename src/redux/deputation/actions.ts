//Get Reducer Call--->
export const getDeputationRequest = (params?: any) => ({
  type: 'GET_DEPUTATION_REQUEST',
  payload: params,
});

export const getDeputationSuccess = (data: any) => ({
  type: 'GET_DEPUTATION_SUCCESS',
  payload: { data },
});

export const getDeputationFailure = (errorMessage: string) => ({
  type: 'GET_DEPUTATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDeputation = () => ({
  type: 'RESET_GET_DEPUTATION',
});

//Create Reducer Call--->
export const createDeputationRequest = (data: any) => ({
  type: 'CREATE_DEPUTATION_REQUEST',
  payload: data,
});

export const createDeputationSuccess = (data: any) => ({
  type: 'CREATE_DEPUTATION_SUCCESS',
  payload: { data },
});

export const createDeputationFailure = (errorMessage: string) => ({
  type: 'CREATE_DEPUTATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDeputation = () => ({
  type: 'RESET_CREATE_DEPUTATION',
});

//Update Reducer Call--->
export const updateDeputationRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DEPUTATION_REQUEST',
  payload: { data, id },
});

export const updateDeputationSuccess = (data: any) => ({
  type: 'UPDATE_DEPUTATION_SUCCESS',
  payload: { data },
});

export const updateDeputationFailure = (errorMessage: string) => ({
  type: 'UPDATE_DEPUTATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDeputation = () => ({
  type: 'RESET_UPDATE_DEPUTATION',
});
//Delete Reducer Call--->
// export const deleteDeputationRequest = ( id: string) => ({
//   type: 'DELETE_DEPUTATION_REQUEST',
//   payload: { id },
// });

// export const deleteDeputationSuccess = (data: any) => ({
//   type: 'DELETE_DEPUTATION_SUCCESS',
//   payload: { data },
// });

// export const deleteDeputationFailure = (errorMessage: string) => ({
//   type: 'DELETE_DEPUTATION_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDeputation = () => ({
//   type: 'RESET_DELETE_DEPUTATION',
// });
