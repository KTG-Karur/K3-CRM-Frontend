import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const expensiveType = apiContainer.expensiveType
//GET--->
export async function getExpensiveType(request) {
  try {
    const response = await apiReturnCallBack("GET", expensiveType, request);
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
export async function createExpensiveType(request) {
  try {
    const response = await apiReturnCallBack("POST", expensiveType, request);
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
export async function updateExpensiveType(request, expensiveTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", expensiveType+`/${expensiveTypeId}`, request);
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
// export async function deleteExpensiveType(expensiveTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", expensiveType+`/${expensiveTypeId}`);
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

