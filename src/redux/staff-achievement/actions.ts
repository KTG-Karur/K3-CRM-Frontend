//Get Reducer Call--->
export const getStaffAchievementRequest = (params?: any) => ({
  type: 'GET_STAFF_ACHIEVEMENT_REQUEST',
  payload: params,
});

export const getStaffAchievementSuccess = (data: any) => ({
  type: 'GET_STAFF_ACHIEVEMENT_SUCCESS',
  payload: { data },
});

export const getStaffAchievementFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_ACHIEVEMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffAchievement = () => ({
  type: 'RESET_GET_STAFF_ACHIEVEMENT',
});

//Create Reducer Call--->
export const createStaffAchievementRequest = (data: any) => ({
  type: 'CREATE_STAFF_ACHIEVEMENT_REQUEST',
  payload: data,
});

export const createStaffAchievementSuccess = (data: any) => ({
  type: 'CREATE_STAFF_ACHIEVEMENT_SUCCESS',
  payload: { data },
});

export const createStaffAchievementFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_ACHIEVEMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffAchievement = () => ({
  type: 'RESET_CREATE_STAFF_ACHIEVEMENT',
});

//Update Reducer Call--->
export const updateStaffAchievementRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_ACHIEVEMENT_REQUEST',
  payload: { data, id },
});

export const updateStaffAchievementSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_ACHIEVEMENT_SUCCESS',
  payload: { data },
});

export const updateStaffAchievementFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_ACHIEVEMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffAchievement = () => ({
  type: 'RESET_UPDATE_STAFF_ACHIEVEMENT',
});
//Delete Reducer Call--->
export const deleteStaffAchievementRequest = ( id: string) => ({
  type: 'DELETE_STAFF_ACHIEVEMENT_REQUEST',
  payload: { id },
});

export const deleteStaffAchievementSuccess = (data: any) => ({
  type: 'DELETE_STAFF_ACHIEVEMENT_SUCCESS',
  payload: { data },
});

export const deleteStaffAchievementFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_ACHIEVEMENT_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffAchievement = () => ({
  type: 'RESET_DELETE_STAFF_ACHIEVEMENT',
});
