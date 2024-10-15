import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const incomeType = apiContainer.incomeType
//GET--->
export async function getIncomeType(request) {
  try {
    const response = await apiReturnCallBack("GET", incomeType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createIncomeType(request) {
  try {
    const response = await apiReturnCallBack("POST", incomeType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateIncomeType(request, incomeTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", incomeType+`/${incomeTypeId}`, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
// export async function deleteIncomeType(incomeTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", incomeType+`/${incomeTypeId}`);
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

