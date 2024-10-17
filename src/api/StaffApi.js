import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staff = apiContainer.staff
//GET--->
export async function getStaff(request) {
  try {
    const response = await apiReturnCallBack("GET", staff, request);
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
export async function createStaff(request) {
  try {
    const response = await apiReturnCallBack("POST", staff, request);
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
export async function updateStaff(request, staffId) {
  try {
    const response = await apiReturnCallBack("PUT", staff+`/${staffId}`, request);
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
// export async function deleteStaff(staffId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", staff+`/${staffId}`);
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

