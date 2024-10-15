import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const contra = apiContainer.contra
const contraDetails = apiContainer.contraDetails
//GET--->
export async function getContra(request) {
  try {
    const response = await apiReturnCallBack("GET", contra, request);
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
//GET--->
export async function getContraDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", contraDetails, request);
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
export async function createContra(request) {
  try {
    const response = await apiReturnCallBack("POST", contra, request);
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
export async function updateContra(request, contraId) {
  try {
    const response = await apiReturnCallBack("PUT", contra+`/${contraId}`, request);
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
// export async function deleteContra(contraId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", contra+`/${contraId}`);
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

