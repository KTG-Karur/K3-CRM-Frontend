import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffAchievement = apiContainer.staffAchievement
//GET--->
export async function getStaffAchievement(request) {
  try {
    const response = await apiReturnCallBack("GET", staffAchievement, request);
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
export async function createStaffAchievement(request) {
  try {
    const response = await apiReturnCallBack("POST", staffAchievement, request);
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
export async function updateStaffAchievement(request, staffAchievementId) {
  try {
    const response = await apiReturnCallBack("PUT", staffAchievement+`/${staffAchievementId}`, request);
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
export async function deleteStaffAchievement(staffAchievementId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffAchievement+`/${staffAchievementId}`);
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

