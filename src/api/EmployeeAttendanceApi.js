import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const employeeAttendance = apiContainer.employeeAttendance
const employeeAttendanceReport = apiContainer.employeeAttendanceReport
//GET--->
export async function getEmployeeAttendance(request) {
  try {
    const response = await apiReturnCallBack("GET", employeeAttendance, request);
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

//GET--->
export async function getEmployeeAttendanceReport(request) {
  try {
    const response = await apiReturnCallBack("GET", employeeAttendanceReport, request);
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
export async function createEmployeeAttendance(request) {
  try {
    const response = await apiReturnCallBack("POST", employeeAttendance, request);
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
export async function updateEmployeeAttendance(request, employeeAttendanceId) {
  try {
    const response = await apiReturnCallBack("PUT", employeeAttendance+`/${employeeAttendanceId}`, request);
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
// export async function deleteEmployeeAttendance(employeeAttendanceId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", employeeAttendance+`/${employeeAttendanceId}`);
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

