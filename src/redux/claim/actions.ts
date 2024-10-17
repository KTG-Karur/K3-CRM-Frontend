//Get Reducer Call--->
export const getClaimRequest = (params?: any) => ({
  type: 'GET_CLAIM_REQUEST',
  payload: params,
});

export const getClaimSuccess = (data: any) => ({
  type: 'GET_CLAIM_SUCCESS',
  payload: { data },
});

export const getClaimFailure = (errorMessage: string) => ({
  type: 'GET_CLAIM_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetClaim = () => ({
  type: 'RESET_GET_CLAIM',
});

//Create Reducer Call--->
export const createClaimRequest = (data: any) => ({
  type: 'CREATE_CLAIM_REQUEST',
  payload: data,
});

export const createClaimSuccess = (data: any) => ({
  type: 'CREATE_CLAIM_SUCCESS',
  payload: { data },
});

export const createClaimFailure = (errorMessage: string) => ({
  type: 'CREATE_CLAIM_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateClaim = () => ({
  type: 'RESET_CREATE_CLAIM',
});

//Update Reducer Call--->
export const updateClaimRequest = ( data: any, id: string) => ({
  type: 'UPDATE_CLAIM_REQUEST',
  payload: { data, id },
});

export const updateClaimSuccess = (data: any) => ({
  type: 'UPDATE_CLAIM_SUCCESS',
  payload: { data },
});

export const updateClaimFailure = (errorMessage: string) => ({
  type: 'UPDATE_CLAIM_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateClaim = () => ({
  type: 'RESET_UPDATE_CLAIM',
});
//Delete Reducer Call--->
export const deleteClaimRequest = ( id: string) => ({
  type: 'DELETE_CLAIM_REQUEST',
  payload: { id },
});

export const deleteClaimSuccess = (data: any) => ({
  type: 'DELETE_CLAIM_SUCCESS',
  payload: { data },
});

export const deleteClaimFailure = (errorMessage: string) => ({
  type: 'DELETE_CLAIM_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateClaim = () => ({
  type: 'RESET_DELETE_CLAIM',
});
