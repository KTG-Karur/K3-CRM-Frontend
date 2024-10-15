import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const disbursedMethod = apiContainer.disbursedMethod
//GET--->
export async function getDisbursedMethod(request) {
  try {
    const response = await apiReturnCallBack("GET", disbursedMethod, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createDisbursedMethod(request) {
  try {
    const response = await apiReturnCallBack("POST", disbursedMethod, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateDisbursedMethod(request, disbursedMethodId) {
  try {
    const response = await apiReturnCallBack("PUT", disbursedMethod+`/${disbursedMethodId}`, request);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
// export async function deleteDisbursedMethod(disbursedMethodId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", disbursedMethod+`/${disbursedMethodId}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }

