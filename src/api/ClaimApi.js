import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const claim = apiContainer.claim
//GET--->
export async function getClaim(request) {
  try {
    const response = await apiReturnCallBack("GET", claim, request);
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
export async function createClaim(request) {
  try {
    const response = await apiReturnCallBack("POST", claim, request);
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
export async function updateClaim(request, claimId) {
  try {
    const response = await apiReturnCallBack("PUT", claim+`/${claimId}`, request);
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
// export async function deleteClaim(claimId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", claim+`/${claimId}`);
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

