import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const expenseEntry = apiContainer.expenseEntry
//GET--->
export async function getExpenseEntry(request) {
  try {
    const response = await apiReturnCallBack("GET", expenseEntry, request);
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
export async function createExpenseEntry(request) {
  try {
    const response = await apiReturnCallBack("POST", expenseEntry, request);
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
export async function updateExpenseEntry(request, expenseEntryId) {
  try {
    const response = await apiReturnCallBack("PUT", expenseEntry+`/${expenseEntryId}`, request);
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
// export async function deleteExpenseEntry(expenseEntryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", expenseEntry+`/${expenseEntryId}`);
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

