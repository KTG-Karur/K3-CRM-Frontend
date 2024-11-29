//Get Reducer Call--->
export const getStaffTrainingRequest = (params?: any) => ({
  type: 'GET_STAFF_TRAINING_REQUEST',
  payload: params,
});

export const getStaffTrainingSuccess = (data: any) => ({
  type: 'GET_STAFF_TRAINING_SUCCESS',
  payload: { data },
});

export const getStaffTrainingFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_TRAINING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffTraining = () => ({
  type: 'RESET_GET_STAFF_TRAINING',
});

//Create Reducer Call--->
export const createStaffTrainingRequest = (data: any) => ({
  type: 'CREATE_STAFF_TRAINING_REQUEST',
  payload: data,
});

export const createStaffTrainingSuccess = (data: any) => ({
  type: 'CREATE_STAFF_TRAINING_SUCCESS',
  payload: { data },
});

export const createStaffTrainingFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_TRAINING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffTraining = () => ({
  type: 'RESET_CREATE_STAFF_TRAINING',
});

//Update Reducer Call--->
export const updateStaffTrainingRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_TRAINING_REQUEST',
  payload: { data, id },
});

export const updateStaffTrainingSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_TRAINING_SUCCESS',
  payload: { data },
});

export const updateStaffTrainingFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_TRAINING_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffTraining = () => ({
  type: 'RESET_UPDATE_STAFF_TRAINING',
});
//Delete Reducer Call--->
export const deleteStaffTrainingRequest = ( id: string) => ({
  type: 'DELETE_STAFF_TRAINING_REQUEST',
  payload: { id },
});

export const deleteStaffTrainingSuccess = (data: any) => ({
  type: 'DELETE_STAFF_TRAINING_SUCCESS',
  payload: { data },
});

export const deleteStaffTrainingFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_TRAINING_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffTraining = () => ({
  type: 'RESET_DELETE_STAFF_TRAINING',
});
