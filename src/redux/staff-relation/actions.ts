//Get Reducer Call--->
export const getStaffRelationRequest = (params?: any) => ({
  type: 'GET_STAFF_RELATION_REQUEST',
  payload: params,
});

export const getStaffRelationSuccess = (data: any) => ({
  type: 'GET_STAFF_RELATION_SUCCESS',
  payload: { data },
});

export const getStaffRelationFailure = (errorMessage: string) => ({
  type: 'GET_STAFF_RELATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetStaffRelation = () => ({
  type: 'RESET_GET_STAFF_RELATION',
});

//Create Reducer Call--->
export const createStaffRelationRequest = (data: any) => ({
  type: 'CREATE_STAFF_RELATION_REQUEST',
  payload: data,
});

export const createStaffRelationSuccess = (data: any) => ({
  type: 'CREATE_STAFF_RELATION_SUCCESS',
  payload: { data },
});

export const createStaffRelationFailure = (errorMessage: string) => ({
  type: 'CREATE_STAFF_RELATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateStaffRelation = () => ({
  type: 'RESET_CREATE_STAFF_RELATION',
});

//Update Reducer Call--->
export const updateStaffRelationRequest = ( data: any, id: string) => ({
  type: 'UPDATE_STAFF_RELATION_REQUEST',
  payload: { data, id },
});

export const updateStaffRelationSuccess = (data: any) => ({
  type: 'UPDATE_STAFF_RELATION_SUCCESS',
  payload: { data },
});

export const updateStaffRelationFailure = (errorMessage: string) => ({
  type: 'UPDATE_STAFF_RELATION_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateStaffRelation = () => ({
  type: 'RESET_UPDATE_STAFF_RELATION',
});
//Delete Reducer Call--->
export const deleteStaffRelationRequest = ( id: string) => ({
  type: 'DELETE_STAFF_RELATION_REQUEST',
  payload: { id },
});

export const deleteStaffRelationSuccess = (data: any) => ({
  type: 'DELETE_STAFF_RELATION_SUCCESS',
  payload: { data },
});

export const deleteStaffRelationFailure = (errorMessage: string) => ({
  type: 'DELETE_STAFF_RELATION_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdateStaffRelation = () => ({
  type: 'RESET_DELETE_STAFF_RELATION',
});
