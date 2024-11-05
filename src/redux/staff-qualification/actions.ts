//Get Reducer Call--->
export const getStaffQualificationRequest = (params?: any) => ({
  type: 'GET_STAFF_QUALIFICATION_REQUEST',
  payload: params,
});

export const getStaffQualificationSuccess = (data: any) => ({
  type: 'GET_STAFF_QUALIFICATION_SUCCESS',
  payload: { data },
});

export const getStaffQualificationFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_QUALIFICATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffQualification = () => ({
  type: 'RESET_GET_STAFF_QUALIFICATION',
});

//Create Reducer Call--->
export const createStaffQualificationRequest = (data: any) => ({
  type: 'CREATE_STAFF_QUALIFICATION_REQUEST',
  payload: data,
});

export const createStaffQualificationSuccess = (data: any) => ({
  type: 'CREATE_STAFF_QUALIFICATION_SUCCESS',
  payload: { data },
});

export const createStaffQualificationFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_QUALIFICATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffQualification = () => ({
  type: 'RESET_CREATE_STAFF_QUALIFICATION',
});

//Update Reducer Call--->
export const updateStaffQualificationRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_QUALIFICATION_REQUEST',
  payload: { data, id },
});

export const updateStaffQualificationSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_QUALIFICATION_SUCCESS',
  payload: { data },
});

export const updateStaffQualificationFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_QUALIFICATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffQualification = () => ({
  type: 'RESET_UPDATE_STAFF_QUALIFICATION',
});
//Delete Reducer Call--->
export const deleteStaffQualificationRequest = ( id: string) => ({
  type: 'DELETE_STAFF_QUALIFICATION_REQUEST',
  payload: { id },
});

export const deleteStaffQualificationSuccess = (data: any) => ({
  type: 'DELETE_STAFF_QUALIFICATION_SUCCESS',
  payload: { data },
});

export const deleteStaffQualificationFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_QUALIFICATION_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffQualification = () => ({
  type: 'RESET_DELETE_STAFF_QUALIFICATION',
});
