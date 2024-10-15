import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const designation = apiContainer.designation
//GET--->
export async function getDesignation(request) {
  try {
    const response = await apiReturnCallBack("GET", designation, request);
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
export async function createDesignation(request) {
  try {
    const response = await apiReturnCallBack("POST", designation, request);
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
export async function updateDesignation(request, designationId) {
  try {
    const response = await apiReturnCallBack("PUT", designation+`/${designationId}`, request);
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
// export async function deleteDesignation(designationId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", designation+`/${designationId}`);
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

