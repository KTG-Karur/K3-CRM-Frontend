//Get Reducer Call--->
export const getBranchRequest = (params?: any) => ({
  type: 'GET_BRANCH_REQUEST',
  payload: params,
});

export const getBranchSuccess = (data: any) => ({
  type: 'GET_BRANCH_SUCCESS',
  payload: { data },
});

export const getBranchFailure = (errorMessage: string) => ({
  type: 'GET_BRANCH_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetBranch = () => ({
  type: 'RESET_GET_BRANCH',
});

//Create Reducer Call--->
export const createBranchRequest = (data: any) => ({
  type: 'CREATE_BRANCH_REQUEST',
  payload: data,
});

export const createBranchSuccess = (data: any) => ({
  type: 'CREATE_BRANCH_SUCCESS',
  payload: { data },
});

export const createBranchFailure = (errorMessage: string) => ({
  type: 'CREATE_BRANCH_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateBranch = () => ({
  type: 'RESET_CREATE_BRANCH',
});

//Update Reducer Call--->
export const updateBranchRequest = ( data: any, id: string) => ({
  type: 'UPDATE_BRANCH_REQUEST',
  payload: { data, id },
});

export const updateBranchSuccess = (data: any) => ({
  type: 'UPDATE_BRANCH_SUCCESS',
  payload: { data },
});

export const updateBranchFailure = (errorMessage: string) => ({
  type: 'UPDATE_BRANCH_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateBranch = () => ({
  type: 'RESET_UPDATE_BRANCH',
});
//Delete Reducer Call--->
export const deleteBranchRequest = ( id: string) => ({
  type: 'DELETE_BRANCH_REQUEST',
  payload: { id },
});

export const deleteBranchSuccess = (data: any) => ({
  type: 'DELETE_BRANCH_SUCCESS',
  payload: { data },
});

export const deleteBranchFailure = (errorMessage: string) => ({
  type: 'DELETE_BRANCH_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateBranch = () => ({
  type: 'RESET_DELETE_BRANCH',
});
