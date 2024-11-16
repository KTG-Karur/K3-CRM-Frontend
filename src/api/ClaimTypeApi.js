import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const claimType = apiContainer.claimType
//GET--->
export async function getClaimType(request) {
  try {
    const response = await apiReturnCallBack("GET", claimType, request);
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
export async function createClaimType(request) {
  try {
    const response = await apiReturnCallBack("POST", claimType, request);
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
export async function updateClaimType(request, claimTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", claimType+`/${claimTypeId}`, request);
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
// export async function deleteClaimType(claimTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", claimType+`/${claimTypeId}`);
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

