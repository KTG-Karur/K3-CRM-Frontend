import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const settingWorkingDay = apiContainer.settingWorkingDay
//GET--->
export async function getSettingWorkingDay(request) {
  try {
    const response = await apiReturnCallBack("GET", settingWorkingDay, request);
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
export async function createSettingWorkingDay(request) {
  
  try {
    const response = await apiReturnCallBack("POST", settingWorkingDay, request);
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
export async function updateSettingWorkingDay(request, settingWorkingDayId) {
  try {
    const response = await apiReturnCallBack("PUT", settingWorkingDay+`/${settingWorkingDayId}`, request);
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
// export async function deleteSettingWorkingDay(settingWorkingDayId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", settingWorkingDay+`/${settingWorkingDayId}`);
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

