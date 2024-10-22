//Get Reducer Call--->
export const getHolidayRequest = (params?: any) => ({
  type: 'GET_HOLIDAY_REQUEST',
  payload: params,
});

export const getHolidaySuccess = (data: any) => ({
  type: 'GET_HOLIDAY_SUCCESS',
  payload: { data },
});

export const getHolidayFailure = (errorMessage: string) => ({
  type: 'GET_HOLIDAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetHoliday = () => ({
  type: 'RESET_GET_HOLIDAY',
});

//Create Reducer Call--->
export const createHolidayRequest = (data: any) => ({
  type: 'CREATE_HOLIDAY_REQUEST',
  payload: data,
});

export const createHolidaySuccess = (data: any) => ({
  type: 'CREATE_HOLIDAY_SUCCESS',
  payload: { data },
});

export const createHolidayFailure = (errorMessage: string) => ({
  type: 'CREATE_HOLIDAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetCreateHoliday = () => ({
  type: 'RESET_CREATE_HOLIDAY',
});

//Update Reducer Call--->
export const updateHolidayRequest = ( data: any, id: string) => ({
  type: 'UPDATE_HOLIDAY_REQUEST',
  payload: { data, id },
});

export const updateHolidaySuccess = (data: any) => ({
  type: 'UPDATE_HOLIDAY_SUCCESS',
  payload: { data },
});

export const updateHolidayFailure = (errorMessage: string) => ({
  type: 'UPDATE_HOLIDAY_FAILURE',
  errorMessage: { errorMessage },
});

export const resetUpdateHoliday = () => ({
  type: 'RESET_UPDATE_HOLIDAY',
});
//Delete Reducer Call--->
// export const deleteHolidayRequest = ( id: string) => ({
//   type: 'DELETE_HOLIDAY_REQUEST',
//   payload: { id },
// });

// export const deleteHolidaySuccess = (data: any) => ({
//   type: 'DELETE_HOLIDAY_SUCCESS',
//   payload: { data },
// });

// export const deleteHolidayFailure = (errorMessage: string) => ({
//   type: 'DELETE_HOLIDAY_FAILURE',
//   errorMessage: { errorMessage },
// });

// export const deleteUpdateHoliday = () => ({
//   type: 'RESET_DELETE_HOLIDAY',
// });
