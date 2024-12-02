import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const transferStaff = apiContainer.transferStaff
//GET--->
export async function getTransferStaff(request) {
  try {
    const response = await apiReturnCallBack("GET", transferStaff, request);
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
export async function createTransferStaff(request) {
  try {
    const response = await apiReturnCallBack("POST", transferStaff, request);
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
export async function updateTransferStaff(request, transferStaffId) {
  try {
    const response = await apiReturnCallBack("PUT", transferStaff+`/${transferStaffId}`, request);
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
// export async function deleteTransferStaff(transferStaffId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", transferStaff+`/${transferStaffId}`);
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

