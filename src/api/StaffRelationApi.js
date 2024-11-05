import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffRelation = apiContainer.staffRelation
//GET--->
export async function getStaffRelation(request) {
  try {
    const response = await apiReturnCallBack("GET", staffRelation, request);
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
export async function createStaffRelation(request) {
  try {
    const response = await apiReturnCallBack("POST", staffRelation, request);
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
export async function updateStaffRelation(request, staffRelationId) {
  try {
    const response = await apiReturnCallBack("PUT", staffRelation+`/${staffRelationId}`, request);
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
export async function deleteStaffRelation(staffRelationId) {
  try {
    const response = await apiReturnCallBack("DELETE", staffRelation+`/${staffRelationId}`);
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

