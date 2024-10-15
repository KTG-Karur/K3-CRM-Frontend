import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const loanChargesDetails = apiContainer.loanChargesDetails
//GET--->
export async function getLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("GET", loanChargesDetails, request);
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
export async function createLoanCharges(request) {
  try {
    const response = await apiReturnCallBack("POST", loanChargesDetails, request);
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
export async function updateLoanCharges(request, loanChargesId) {
  try {
    const response = await apiReturnCallBack("PUT", loanChargesDetails+`/${loanChargesId}`, request);
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
export async function deleteLoanCharges(loanChargesId) {
  try {
    const response = await apiReturnCallBack("DELETE", loanChargesDetails+`/${loanChargesId}`);
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

