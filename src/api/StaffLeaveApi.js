import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffLeave = apiContainer.staffLeave;
//GET--->
export async function getStaffLeave(request) {
    try {
        const response = await apiReturnCallBack('GET', staffLeave, request);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || JSON.stringify(data));
        }
        console.log("data")
        console.log(data)
        console.log("response")
        console.log(response)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//CREATE---->
export async function createStaffLeave(request) {
    try {
        const response = await apiReturnCallBack('POST', staffLeave, request);
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
export async function updateStaffLeave(request, staffLeaveId) {
    try {
        const response = await apiReturnCallBack('PUT', staffLeave + `/${staffLeaveId}`, request);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || JSON.stringify(data));
        }
        return data;
    } catch (error) {
        throw error;
    }
}
//DELETE---->
export async function deleteStaffLeave(staffLeaveId) {
    try {
        const response = await apiReturnCallBack('DELETE', staffLeave + `/${staffLeaveId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
