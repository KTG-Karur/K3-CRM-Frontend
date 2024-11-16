import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffProof = apiContainer.staffProof
//GET--->
export async function getStaffProof(request) {
  try {
    const response = await apiReturnCallBack("GET", staffProof, request);
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
export async function createStaffProof(request) {
  try {
    const response = await apiReturnCallBack("POST", staffProof, request);
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
export async function updateStaffProof(request, staffProofId) {
  try {
    const response = await apiReturnCallBack("PUT", staffProof+`/${staffProofId}`, request);
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
export async function deleteStaffProof(staffProofId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffProof+`/${staffProofId}`);
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

