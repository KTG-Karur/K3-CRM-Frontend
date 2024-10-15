import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const employee = apiContainer.employee
//GET--->
export async function getEmployee(request) {
  try {
    const response = await apiReturnCallBack("GET", employee, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//CREATE---->
export async function createEmployee(request) {
  try {
    const response = await apiReturnCallBack("POST", employee, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//UPDATE---->
export async function updateEmployee(request, employeeId) {
  try {
    const response = await apiReturnCallBack("PUT", employee+`/${employeeId}`, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
//DELETE---->
// export async function deleteEmployee(employeeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", employee+`/${employeeId}`);
//     if (!response.ok) {
//       throw new Error(data.message || JSON.stringify(data));
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }

