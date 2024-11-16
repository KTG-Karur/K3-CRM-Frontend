import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const settingBenefit = apiContainer.settingBenefit
//GET--->
export async function getSettingBenefit(request) {
  try {
    const response = await apiReturnCallBack("GET", settingBenefit, request);
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
export async function createSettingBenefit(request) {

  console.log(request);
  try {
    const response = await apiReturnCallBack("POST", settingBenefit, request);
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
export async function updateSettingBenefit(request, settingBenefitId) {
  try {
    const response = await apiReturnCallBack("PUT", settingBenefit+`/${settingBenefitId}`, request);
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
// export async function deleteSettingBenefit(settingBenefitId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", settingBenefit+`/${settingBenefitId}`);
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

