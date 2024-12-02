import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const attendanceIncharge = apiContainer.attendanceIncharge
//GET--->
export async function getAttendanceIncharge(request) {
  try {
    const response = await apiReturnCallBack("GET", attendanceIncharge, request);
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
export async function createAttendanceIncharge(request) {

  try {
    const response = await apiReturnCallBack("POST", attendanceIncharge, request);
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
export async function updateAttendanceIncharge(request, attendanceInchargeId) {
  try {
    const response = await apiReturnCallBack("PUT", attendanceIncharge+`/${attendanceInchargeId}`, request);
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
// export async function deleteAttendanceIncharge(attendanceInchargeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", attendanceIncharge+`/${attendanceInchargeId}`);
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

