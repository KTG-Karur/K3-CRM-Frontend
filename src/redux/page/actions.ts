//Get Reducer Call--->
export const getPageRequest = (params?: any) => ({
  type: 'GET_PAGE_REQUEST',
  payload: params,
});

export const getPageSuccess = (data: any) => ({
  type: 'GET_PAGE_SUCCESS',
  payload: { data },
});

export const getPageFailure = (errorMessage: string) => ({
  type: 'GET_PAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetPage = () => ({
  type: 'RESET_GET_PAGE',
});

//Create Reducer Call--->
export const createPageRequest = (data: any) => ({
  type: 'CREATE_PAGE_REQUEST',
  payload: data,
});

export const createPageSuccess = (data: any) => ({
  type: 'CREATE_PAGE_SUCCESS',
  payload: { data },
});

export const createPageFailure = (errorMessage: string) => ({
  type: 'CREATE_PAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreatePage = () => ({
  type: 'RESET_CREATE_PAGE',
});

//Update Reducer Call--->
export const updatePageRequest = ( data: any, id: string) => ({
  type: 'UPDATE_PAGE_REQUEST',
  payload: { data, id },
});

export const updatePageSuccess = (data: any) => ({
  type: 'UPDATE_PAGE_SUCCESS',
  payload: { data },
});

export const updatePageFailure = (errorMessage: string) => ({
  type: 'UPDATE_PAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdatePage = () => ({
  type: 'RESET_UPDATE_PAGE',
});
//Delete Reducer Call--->
export const deletePageRequest = ( id: string) => ({
  type: 'DELETE_PAGE_REQUEST',
  payload: { id },
});

export const deletePageSuccess = (data: any) => ({
  type: 'DELETE_PAGE_SUCCESS',
  payload: { data },
});

export const deletePageFailure = (errorMessage: string) => ({
  type: 'DELETE_PAGE_FAILURE',
  errorMessage: { errorMessage },
});

export const deleteUpdatePage = () => ({
  type: 'RESET_DELETE_PAGE',
});
