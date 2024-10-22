//Get Reducer Call--->
export const getProofTypeRequest = (params?: any) => ({
  type: 'GET_PROOF_TYPE_REQUEST',
  payload: params,
});

export const getProofTypeSuccess = (data: any) => ({
  type: 'GET_PROOF_TYPE_SUCCESS',
  payload: { data },
});

export const getProofTypeFailure = (errorMessage: string) => ({
  type: 'GET_PROOF_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetProofType = () => ({
  type: 'RESET_GET_PROOF_TYPE',
});

//Create Reducer Call--->
export const createProofTypeRequest = (data: any) => ({
  type: 'CREATE_PROOF_TYPE_REQUEST',
  payload: data,
});

export const createProofTypeSuccess = (data: any) => ({
  type: 'CREATE_PROOF_TYPE_SUCCESS',
  payload: { data },
});

export const createProofTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_PROOF_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateProofType = () => ({
  type: 'RESET_CREATE_PROOF_TYPE',
});

//Update Reducer Call--->
export const updateProofTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_PROOF_TYPE_REQUEST',
  payload: { data, id },
});

export const updateProofTypeSuccess = (data: any) => ({
  type: 'UPDATE_PROOF_TYPE_SUCCESS',
  payload: { data },
});

export const updateProofTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_PROOF_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateProofType = () => ({
  type: 'RESET_UPDATE_PROOF_TYPE',
});
//Delete Reducer Call--->
export const deleteProofTypeRequest = ( id: string) => ({
  type: 'DELETE_PROOF_TYPE_REQUEST',
  payload: { id },
});

export const deleteProofTypeSuccess = (data: any) => ({
  type: 'DELETE_PROOF_TYPE_SUCCESS',
  payload: { data },
});

export const deleteProofTypeFailure = (errorMessage: string) => ({
  type: 'DELETE_PROOF_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateProofType = () => ({
  type: 'RESET_DELETE_PROOF_TYPE',
});
