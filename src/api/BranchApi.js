import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const branch = apiContainer.branch
//GET--->
export async function getBranch(request) {
  try {
    const response = await apiReturnCallBack("GET", branch, request);
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
export async function createBranch(request) {
  
  try {
    const response = await apiReturnCallBack("POST", branch, request);
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
export async function updateBranch(request, branchId) {
  try {
    const response = await apiReturnCallBack("PUT", branch+`/${branchId}`, request);
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
// export async function deleteBranch(branchId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", branch+`/${branchId}`);
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

