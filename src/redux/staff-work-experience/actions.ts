//Get Reducer Call--->
export const getStaffWorkExperienceRequest = (params?: any) => ({
  type: 'GET_STAFF_WORK_EXPERIENCE_REQUEST',
  payload: params,
});

export const getStaffWorkExperienceSuccess = (data: any) => ({
  type: 'GET_STAFF_WORK_EXPERIENCE_SUCCESS',
  payload: { data },
});

export const getStaffWorkExperienceFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_WORK_EXPERIENCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffWorkExperience = () => ({
  type: 'RESET_GET_STAFF_WORK_EXPERIENCE',
});

//Create Reducer Call--->
export const createStaffWorkExperienceRequest = (data: any) => ({
  type: 'CREATE_STAFF_WORK_EXPERIENCE_REQUEST',
  payload: data,
});

export const createStaffWorkExperienceSuccess = (data: any) => ({
  type: 'CREATE_STAFF_WORK_EXPERIENCE_SUCCESS',
  payload: { data },
});

export const createStaffWorkExperienceFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_WORK_EXPERIENCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffWorkExperience = () => ({
  type: 'RESET_CREATE_STAFF_WORK_EXPERIENCE',
});

//Update Reducer Call--->
export const updateStaffWorkExperienceRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_WORK_EXPERIENCE_REQUEST',
  payload: { data, id },
});

export const updateStaffWorkExperienceSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_WORK_EXPERIENCE_SUCCESS',
  payload: { data },
});

export const updateStaffWorkExperienceFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_WORK_EXPERIENCE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffWorkExperience = () => ({
  type: 'RESET_UPDATE_STAFF_WORK_EXPERIENCE',
});
//Delete Reducer Call--->
export const deleteStaffWorkExperienceRequest = ( id: string) => ({
  type: 'DELETE_STAFF_WORK_EXPERIENCE_REQUEST',
  payload: { id },
});

export const deleteStaffWorkExperienceSuccess = (data: any) => ({
  type: 'DELETE_STAFF_WORK_EXPERIENCE_SUCCESS',
  payload: { data },
});

export const deleteStaffWorkExperienceFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_WORK_EXPERIENCE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffWorkExperience = () => ({
  type: 'RESET_DELETE_STAFF_WORK_EXPERIENCE',
});
