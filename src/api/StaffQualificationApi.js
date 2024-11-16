import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffQualification = apiContainer.staffQualification

//GET--->
export async function getStaffQualification(request) {
  try {
    const response = await apiReturnCallBack("GET", staffQualification, request);
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
export async function createStaffQualification(request) {
  try {
    const response = await apiReturnCallBack("POST", staffQualification, request);
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
export async function updateStaffQualification(request, staffQualificationId) {
  try {
    const response = await apiReturnCallBack("PUT", staffQualification+`/${staffQualificationId}`, request);
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
export async function deleteStaffQualification(staffQualificationId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffQualification+`/${staffQualificationId}`);
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

