import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffAdvance = apiContainer.staffAdvance
//GET--->
export async function getStaffAdvance(request) {
  try {
    const response = await apiReturnCallBack("GET", staffAdvance, request);
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
export async function createStaffAdvance(request) {
  console.log(request);
  try {
    const response = await apiReturnCallBack("POST", staffAdvance, request);
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
export async function updateStaffAdvance(request, staffAdvanceId) {
  try {
    const response = await apiReturnCallBack("PUT", staffAdvance+`/${staffAdvanceId}`, request);
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
// export async function deleteStaffAdvance(staffAdvanceId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", staffAdvance+`/${staffAdvanceId}`);
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

