import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const settingLeaveDeduction = apiContainer.settingLeaveDeduction
//GET--->
export async function getSettingLeaveDeduction(request) {
  try {
    const response = await apiReturnCallBack("GET", settingLeaveDeduction, request);
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
export async function createSettingLeaveDeduction(request) {
  
  try {
    const response = await apiReturnCallBack("POST", settingLeaveDeduction, request);
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
export async function updateSettingLeaveDeduction(request, settingLeaveDeductionId) {
  try {
    const response = await apiReturnCallBack("PUT", settingLeaveDeduction+`/${settingLeaveDeductionId}`, request);
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
// export async function deleteSettingLeaveDeduction(settingLeaveDeductionId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", settingLeaveDeduction+`/${settingLeaveDeductionId}`);
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

