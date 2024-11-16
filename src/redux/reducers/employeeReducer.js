import { SET_EMPLOYEE_DATA, REMOVE_EMPLOYEE_DATA } from "../actions_const";

const initialState = {
  employeeData: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: action.payload
      };
    case REMOVE_EMPLOYEE_DATA:
      return {
        ...state,
        employeeData: []
      };
    default:
      return state;
  }
};

export default employeeReducer;