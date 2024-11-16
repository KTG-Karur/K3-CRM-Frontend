//Get Reducer Call--->
export const getClaimTypeRequest = (params?: any) => ({
  type: 'GET_CLAIM_TYPE_REQUEST',
  payload: params,
});

export const getClaimTypeSuccess = (data: any) => ({
  type: 'GET_CLAIM_TYPE_SUCCESS',
  payload: { data },
});

export const getClaimTypeFailure = (errorMessage: string) => ({
  type: 'GET_CLAIM_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetClaimType = () => ({
  type: 'RESET_GET_CLAIM_TYPE',
});

//Create Reducer Call--->
export const createClaimTypeRequest = (data: any) => ({
  type: 'CREATE_CLAIM_TYPE_REQUEST',
  payload: data,
});

export const createClaimTypeSuccess = (data: any) => ({
  type: 'CREATE_CLAIM_TYPE_SUCCESS',
  payload: { data },
});

export const createClaimTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_CLAIM_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateClaimType = () => ({
  type: 'RESET_CREATE_CLAIM_TYPE',
});

//Update Reducer Call--->
export const updateClaimTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_CLAIM_TYPE_REQUEST',
  payload: { data, id },
});

export const updateClaimTypeSuccess = (data: any) => ({
  type: 'UPDATE_CLAIM_TYPE_SUCCESS',
  payload: { data },
});

export const updateClaimTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_CLAIM_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateClaimType = () => ({
  type: 'RESET_UPDATE_CLAIM_TYPE',
});
//Delete Reducer Call--->
export const deleteClaimTypeRequest = ( id: string) => ({
  type: 'DELETE_CLAIM_TYPE_REQUEST',
  payload: { id },
});

export const deleteClaimTypeSuccess = (data: any) => ({
  type: 'DELETE_CLAIM_TYPE_SUCCESS',
  payload: { data },
});

export const deleteClaimTypeFailure = (errorMessage: string) => ({
  type: 'DELETE_CLAIM_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateClaimType = () => ({
  type: 'RESET_DELETE_CLAIM_TYPE',
});
