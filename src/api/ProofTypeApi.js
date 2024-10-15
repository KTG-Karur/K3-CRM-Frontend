import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const proofType = apiContainer.proofType
//GET--->
export async function getProofType(request) {
  try {
    const response = await apiReturnCallBack("GET", proofType, request);
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
export async function createProofType(request) {
  try {
    const response = await apiReturnCallBack("POST", proofType, request);
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
export async function updateProofType(request, proofTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", proofType+`/${proofTypeId}`, request);
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
// export async function deleteProofType(proofTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", proofType+`/${proofTypeId}`);
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

