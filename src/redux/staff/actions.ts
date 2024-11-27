//Get Reducer Call--->
export const getStaffRequest = (params?: any) => ({
    type: 'GET_STAFF_REQUEST',
    payload: params,
});

export const getStaffSuccess = (data: any) => ({
    type: 'GET_STAFF_SUCCESS',
    payload: { data },
});

export const getStaffFailure = (errorMessage: string) => ({
    type: 'GET_STAFF_FAILURE',
    errorMessage: { errorMessage },
});

export const resetGetStaff = () => ({
    type: 'RESET_GET_STAFF',
});

//Get Reducer Call--->
export const getStaffDetailsRequest = (params?: any) => ({
    type: 'GET_STAFF_DETAILS_REQUEST',
    payload: params,
});

export const getStaffDetailsSuccess = (data: any) => ({
    type: 'GET_STAFF_DETAILS_SUCCESS',
    payload: { data },
});

export const getStaffDetailsFailure = (errorMessage: string) => ({
    type: 'GET_STAFF_DETAILS_FAILURE',
    errorMessage: { errorMessage },
});

export const resetGetDetailsStaff = () => ({
    type: 'RESET_GET_STAFF_DETAILS',
});

//Create Reducer Call--->
export const createStaffRequest = (data: any) => ({
    type: 'CREATE_STAFF_REQUEST',
    payload: data,
});

export const createStaffSuccess = (data: any) => ({
    type: 'CREATE_STAFF_SUCCESS',
    payload: { data },
});

export const createStaffFailure = (errorMessage: string) => ({
    type: 'CREATE_STAFF_FAILURE',
    errorMessage: { errorMessage },
});

export const resetCreateStaff = () => ({
    type: 'RESET_CREATE_STAFF',
});

//Update Reducer Call--->
export const updateStaffRequest = (data: any, id: string) => ({
    type: 'UPDATE_STAFF_REQUEST',
    payload: { data, id },
});

export const updateStaffSuccess = (data: any) => ({
    type: 'UPDATE_STAFF_SUCCESS',
    payload: { data },
});

export const updateStaffFailure = (errorMessage: string) => ({
    type: 'UPDATE_STAFF_FAILURE',
    errorMessage: { errorMessage },
});

export const resetUpdateStaff = () => ({
    type: 'RESET_UPDATE_STAFF',
});
//Delete Reducer Call--->
export const deleteStaffRequest = (data: any, id: string) => ({
    type: 'DELETE_STAFF_REQUEST',
    payload: { data, id },
});

export const deleteStaffSuccess = (data: any) => ({
    type: 'DELETE_STAFF_SUCCESS',
    payload: { data },
});

export const deleteStaffFailure = (errorMessage: string) => ({
    type: 'DELETE_STAFF_FAILURE',
    errorMessage: { errorMessage },
});

export const deleteUpdateStaff = () => ({
    type: 'RESET_DELETE_STAFF',
});
