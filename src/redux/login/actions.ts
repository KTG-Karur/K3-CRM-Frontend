//Get Reducer Call--->
export const getEmployeeLoginRequest = (params?: any) => ({
  type: 'GET_EMPLOYEE_LOGIN_REQUEST',
  payload: params,
});

export const getEmployeeLoginSuccess = (data: any) => ({
  type: 'GET_EMPLOYEE_LOGIN_SUCCESS',
  payload: { data },
});

export const getEmployeeLoginFailure = (errorMessage: string) => ({
  type: 'GET_EMPLOYEE_LOGIN_FAILURE',
  errorMessage: { errorMessage },
});

export const resetGetEmployeeLogin = () => ({
  type: 'RESET_GET_EMPLOYEE_LOGIN',
});
