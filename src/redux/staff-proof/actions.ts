//Get Reducer Call--->
export const getStaffProofRequest = (params?: any) => ({
  type: 'GET_STAFF_PROOF_REQUEST',
  payload: params,
});

export const getStaffProofSuccess = (data: any) => ({
  type: 'GET_STAFF_PROOF_SUCCESS',
  payload: { data },
});

export const getStaffProofFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_PROOF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffProof = () => ({
  type: 'RESET_GET_STAFF_PROOF',
});

//Create Reducer Call--->
export const createStaffProofRequest = (data: any) => ({
  type: 'CREATE_STAFF_PROOF_REQUEST',
  payload: data,
});

export const createStaffProofSuccess = (data: any) => ({
  type: 'CREATE_STAFF_PROOF_SUCCESS',
  payload: { data },
});

export const createStaffProofFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_PROOF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffProof = () => ({
  type: 'RESET_CREATE_STAFF_PROOF',
});

//Update Reducer Call--->
export const updateStaffProofRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_PROOF_REQUEST',
  payload: { data, id },
});

export const updateStaffProofSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_PROOF_SUCCESS',
  payload: { data },
});

export const updateStaffProofFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_PROOF_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffProof = () => ({
  type: 'RESET_UPDATE_STAFF_PROOF',
});
//Delete Reducer Call--->
export const deleteStaffProofRequest = ( id: string) => ({
  type: 'DELETE_STAFF_PROOF_REQUEST',
  payload: { id },
});

export const deleteStaffProofSuccess = (data: any) => ({
  type: 'DELETE_STAFF_PROOF_SUCCESS',
  payload: { data },
});

export const deleteStaffProofFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_PROOF_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffProof = () => ({
  type: 'RESET_DELETE_STAFF_PROOF',
});
