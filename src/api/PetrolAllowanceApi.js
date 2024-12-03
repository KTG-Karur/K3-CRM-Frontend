import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const petrolAllowance = apiContainer.petrolAllowance
const petrolAllowanceReport = apiContainer.petrolAllowanceReport
//GET--->
export async function getPetrolAllowance(request) {
  try {
    const response = await apiReturnCallBack("GET", petrolAllowance, request);
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

export async function getPetrolAllowanceReport(request) {
  try {
    const response = await apiReturnCallBack("GET", petrolAllowanceReport, request);
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
export async function createPetrolAllowance(request) {
  try {
    const response = await apiReturnCallBack("POST", petrolAllowance, request);
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
export async function updatePetrolAllowance(request, petrolAllowanceId) {
  try {
    const response = await apiReturnCallBack("PUT", petrolAllowance + `/${petrolAllowanceId}`, request);
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
// export async function deletePetrolAllowance(petrolAllowanceId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", petrolAllowance+`/${petrolAllowanceId}`);
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

