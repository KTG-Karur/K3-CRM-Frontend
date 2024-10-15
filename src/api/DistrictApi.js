import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const district = apiContainer.district
//GET--->
export async function getDistrict(request) {
  try {
    const response = await apiReturnCallBack("GET", district, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createDistrict(request) {
  try {
    const response = await apiReturnCallBack("POST", district, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateDistrict(request, districtId) {
  try {
    const response = await apiReturnCallBack("PUT", district+`/${districtId}`, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
// export async function deleteDistrict(districtId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", district+`/${districtId}`);
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

