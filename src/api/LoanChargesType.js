import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const loanChargesType = apiContainer.loanChargesType
//GET--->
export async function getLoanChargesType(request) {
  try {
    const response = await apiReturnCallBack("GET", loanChargesType, request);
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
export async function createLoanChargesType(request) {
  try {
    const response = await apiReturnCallBack("POST", loanChargesType, request);
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
export async function updateLoanChargesType(request, loanChargesTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", loanChargesType + `/${loanChargesTypeId}`, request);
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
export async function deleteLoanChargesType(loanChargesTypeId) {
  try {
    const response = await apiReturnCallBack("DELETE", loanChargesType + `/${loanChargesTypeId}`);
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

