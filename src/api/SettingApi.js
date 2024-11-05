import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const setting = apiContainer.setting
//GET--->
export async function getSetting(request) {
  try {
    const response = await apiReturnCallBack("GET", setting, request);
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
export async function createSetting(request) {
  
  try {
    const response = await apiReturnCallBack("POST", setting, request);
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
export async function updateSetting(request, settingId) {
  try {
    const response = await apiReturnCallBack("PUT", setting+`/${settingId}`, request);
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
// export async function deleteSetting(settingId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", setting+`/${settingId}`);
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

