import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const addressType = apiContainer.addressType
//GET--->
export async function getAddressType(request) {
  try {
    const response = await apiReturnCallBack("GET", addressType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//CREATE---->
export async function createAddressType(request) {
  try {
    const response = await apiReturnCallBack("POST", addressType, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//UPDATE---->
export async function updateAddressType(request, addressTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", addressType+`/${addressTypeId}`, request);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
//DELETE---->
export async function deleteAddressType(addressTypeId) {
  try {
    const response = await apiReturnCallBack("DELETE", addressType+`/${addressTypeId}`);
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

