import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffOnDuty = apiContainer.staffOnDuty;
//GET--->
export async function getStaffOnDuty(request) {
    try {
        const response = await apiReturnCallBack('GET', staffOnDuty, request);
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
export async function createStaffOnDuty(request) {
    try {
        const response = await apiReturnCallBack('POST', staffOnDuty, request);
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
export async function updateStaffOnDuty(request, staffOnDutyId) {
    try {
        const response = await apiReturnCallBack('PUT', staffOnDuty + `/${staffOnDutyId}`, request);
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
export async function deleteStaffOnDuty(staffOnDutyId) {
    try {
        const response = await apiReturnCallBack('DELETE', staffOnDuty + `/${staffOnDutyId}`);
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
