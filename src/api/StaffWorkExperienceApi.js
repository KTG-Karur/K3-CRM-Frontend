import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffWorkExperience = apiContainer.staffWorkExperience
//GET--->
export async function getStaffWorkExperience(request) {
  try {
    const response = await apiReturnCallBack("GET", staffWorkExperience, request);
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
export async function createStaffWorkExperience(request) {
  try {
    const response = await apiReturnCallBack("POST", staffWorkExperience, request);
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
export async function updateStaffWorkExperience(request, staffWorkExperienceId) {
  try {
    const response = await apiReturnCallBack("PUT", staffWorkExperience+`/${staffWorkExperienceId}`, request);
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
export async function deleteStaffWorkExperience(staffWorkExperienceId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffWorkExperience+`/${staffWorkExperienceId}`);
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

