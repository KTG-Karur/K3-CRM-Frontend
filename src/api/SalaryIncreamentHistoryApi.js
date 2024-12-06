import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const salaryIncreamentHistory = apiContainer.salaryIncreamentHistory
//GET--->
export async function getSalaryIncreamentHistory(request) {
  try {
    const response = await apiReturnCallBack("GET", salaryIncreamentHistory, request);
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
export async function createSalaryIncreamentHistory(request) {
  
  try {
    const response = await apiReturnCallBack("POST", salaryIncreamentHistory, request);
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
export async function updateSalaryIncreamentHistory(request, salaryIncreamentHistoryId) {
  try {
    const response = await apiReturnCallBack("PUT", salaryIncreamentHistory+`/${salaryIncreamentHistoryId}`, request);
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
// export async function deleteSalaryIncreamentHistory(salaryIncreamentHistoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", salaryIncreamentHistory+`/${salaryIncreamentHistoryId}`);
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

