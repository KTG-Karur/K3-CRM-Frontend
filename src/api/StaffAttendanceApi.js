import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const StaffAttendance = apiContainer.StaffAttendance
//GET--->
export async function getStaffAttendance(request) {
  try {
    const response = await apiReturnCallBack("GET", StaffAttendance, request);
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
export async function createStaffAttendance(request) {

  console.log(request);
  try {
    const response = await apiReturnCallBack("POST", StaffAttendance, request);
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
export async function updateStaffAttendance(request, StaffAttendanceId) {
  try {
    const response = await apiReturnCallBack("PUT", StaffAttendance+`/${StaffAttendanceId}`, request);
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
// export async function deleteStaffAttendance(StaffAttendanceId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", StaffAttendance+`/${StaffAttendanceId}`);
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

