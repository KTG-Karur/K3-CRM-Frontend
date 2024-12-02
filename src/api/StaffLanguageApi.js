import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffLanguage = apiContainer.staffLanguage
//GET--->
export async function getStaffLanguage(request) {
  try {
    const response = await apiReturnCallBack("GET", staffLanguage, request);
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
export async function createStaffLanguage(request) {
  try {
    const response = await apiReturnCallBack("POST", staffLanguage, request);
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
export async function updateStaffLanguage(request, staffLanguageId) {
  try {
    const response = await apiReturnCallBack("PUT", staffLanguage+`/${staffLanguageId}`, request);
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
export async function deleteStaffLanguage(staffLanguageId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffLanguage+`/${staffLanguageId}`);
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

