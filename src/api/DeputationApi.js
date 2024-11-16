import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const deputation = apiContainer.deputation
//GET--->
export async function getDeputation(request) {
  try {
    const response = await apiReturnCallBack("GET", deputation, request);
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
export async function createDeputation(request) {

  console.log(request);
  try {
    const response = await apiReturnCallBack("POST", deputation, request);
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
export async function updateDeputation(request, deputationId) {
  try {
    const response = await apiReturnCallBack("PUT", deputation+`/${deputationId}`, request);
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
// export async function deleteDeputation(deputationId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", deputation+`/${deputationId}`);
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

