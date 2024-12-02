//Get Reducer Call--->
export const getTrainingTypeRequest = (params?: any) => ({
  type: 'GET_TRAINING_TYPE_REQUEST',
  payload: params,
});

export const getTrainingTypeSuccess = (data: any) => ({
  type: 'GET_TRAINING_TYPE_SUCCESS',
  payload: { data },
});

export const getTrainingTypeFailure = (errorMessage: string) => ({
  type: 'GET_TRAINING_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetTrainingType = () => ({
  type: 'RESET_GET_TRAINING_TYPE',
});

//Create Reducer Call--->
export const createTrainingTypeRequest = (data: any) => ({
  type: 'CREATE_TRAINING_TYPE_REQUEST',
  payload: data,
});

export const createTrainingTypeSuccess = (data: any) => ({
  type: 'CREATE_TRAINING_TYPE_SUCCESS',
  payload: { data },
});

export const createTrainingTypeFailure = (errorMessage: string) => ({
  type: 'CREATE_TRAINING_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateTrainingType = () => ({
  type: 'RESET_CREATE_TRAINING_TYPE',
});

//Update Reducer Call--->
export const updateTrainingTypeRequest = ( data: any, id: string) => ({
  type: 'UPDATE_TRAINING_TYPE_REQUEST',
  payload: { data, id },
});

export const updateTrainingTypeSuccess = (data: any) => ({
  type: 'UPDATE_TRAINING_TYPE_SUCCESS',
  payload: { data },
});

export const updateTrainingTypeFailure = (errorMessage: string) => ({
  type: 'UPDATE_TRAINING_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateTrainingType = () => ({
  type: 'RESET_UPDATE_TRAINING_TYPE',
});
//Delete Reducer Call--->
export const deleteTrainingTypeRequest = ( id: string) => ({
  type: 'DELETE_TRAINING_TYPE_REQUEST',
  payload: { id },
});

export const deleteTrainingTypeSuccess = (data: any) => ({
  type: 'DELETE_TRAINING_TYPE_SUCCESS',
  payload: { data },
});

export const deleteTrainingTypeFailure = (errorMessage: string) => ({
  type: 'DELETE_TRAINING_TYPE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateTrainingType = () => ({
  type: 'RESET_DELETE_TRAINING_TYPE',
});
