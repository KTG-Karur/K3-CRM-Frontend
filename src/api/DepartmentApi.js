import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const department = apiContainer.department
//GET--->
export async function getDepartment(request) {
  try {
    const response = await apiReturnCallBack("GET", department, request);
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
export async function createDepartment(request) {
  try {
    const response = await apiReturnCallBack("POST", department, request);
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
export async function updateDepartment(request, departmentId) {
  try {
    const response = await apiReturnCallBack("PUT", department+`/${departmentId}`, request);
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
// export async function deleteDepartment(departmentId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", department+`/${departmentId}`);
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

