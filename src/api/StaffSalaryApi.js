import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffsalary = apiContainer.staffSalary
const staffSalaryDetail = apiContainer.staffSalaryDetail
//GET--->
export async function getStaffSalary(request) {
  try {
    const response = await apiReturnCallBack("GET", staffsalary, request);
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
//GET Detail--->
export async function getStaffSalaryDetail(request) {
  try {
    const response = await apiReturnCallBack("GET", staffSalaryDetail, request);
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
export async function createStaffSalary(request) {
  try {
    const response = await apiReturnCallBack("POST", staffsalary, request);
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
export async function updateStaffSalary(request, staffsalaryId) {
  try {
    const response = await apiReturnCallBack("PUT", staffsalary+`/${staffsalaryId}`, request);
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
// export async function deleteStaffSalary(staffsalaryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", staffsalary+`/${staffsalaryId}`);
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

