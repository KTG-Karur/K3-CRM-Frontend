import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const incomeEntry = apiContainer.incomeEntry
//GET--->
export async function getIncomeEntry(request) {
  try {
    const response = await apiReturnCallBack("GET", incomeEntry, request);
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
export async function createIncomeEntry(request) {
  try {
    const response = await apiReturnCallBack("POST", incomeEntry, request);
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
export async function updateIncomeEntry(request, incomeEntryId) {
  try {
    const response = await apiReturnCallBack("PUT", incomeEntry+`/${incomeEntryId}`, request);
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
// export async function deleteIncomeEntry(incomeEntryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", incomeEntry+`/${incomeEntryId}`);
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

