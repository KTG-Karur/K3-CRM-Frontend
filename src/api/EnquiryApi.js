import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const enquiry = apiContainer.enquiry
//GET--->
export async function getEnquiry(request) {
  try {
    const response = await apiReturnCallBack("GET", enquiry, request);
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
export async function createEnquiry(request) {
  try {
    const response = await apiReturnCallBack("POST", enquiry, request);
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
export async function updateEnquiry(request, enquiryId) {
  try {
    const response = await apiReturnCallBack("PUT", enquiry+`/${enquiryId}`, request);
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
export async function deleteEnquiry(enquiryId) {
  try {
    const response = await apiReturnCallBack("DELETE", enquiry+`/${enquiryId}`);
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

