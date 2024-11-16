//Get Reducer Call--->
export const getDesignationRequest = (params?: any) => ({
  type: 'GET_DESIGNATION_REQUEST',
  payload: params,
});

export const getDesignationSuccess = (data: any) => ({
  type: 'GET_DESIGNATION_SUCCESS',
  payload: { data },
});

export const getDesignationFailure = (errorMessage: string) => ({
  type: 'GET_DESIGNATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetDesignation = () => ({
  type: 'RESET_GET_DESIGNATION',
});

//Create Reducer Call--->
export const createDesignationRequest = (data: any) => ({
  type: 'CREATE_DESIGNATION_REQUEST',
  payload: data,
});

export const createDesignationSuccess = (data: any) => ({
  type: 'CREATE_DESIGNATION_SUCCESS',
  payload: { data },
});

export const createDesignationFailure = (errorMessage: string) => ({
  type: 'CREATE_DESIGNATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateDesignation = () => ({
  type: 'RESET_CREATE_DESIGNATION',
});

//Update Reducer Call--->
export const updateDesignationRequest = ( data: any, id: string) => ({
  type: 'UPDATE_DESIGNATION_REQUEST',
  payload: { data, id },
});

export const updateDesignationSuccess = (data: any) => ({
  type: 'UPDATE_DESIGNATION_SUCCESS',
  payload: { data },
});

export const updateDesignationFailure = (errorMessage: string) => ({
  type: 'UPDATE_DESIGNATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateDesignation = () => ({
  type: 'RESET_UPDATE_DESIGNATION',
});
//Delete Reducer Call--->
// export const deleteDesignationRequest = ( id: string) => ({
//   type: 'DELETE_DESIGNATION_REQUEST',
//   payload: { id },
// });

// export const deleteDesignationSuccess = (data: any) => ({
//   type: 'DELETE_DESIGNATION_SUCCESS',
//   payload: { data },
// });

// export const deleteDesignationFailure = (errorMessage: string) => ({
//   type: 'DELETE_DESIGNATION_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateDesignation = () => ({
//   type: 'RESET_DELETE_DESIGNATION',
// });
