import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const investment = apiContainer.investment
const investmentDetails = apiContainer.investmentDetails
//GET--->
export async function getInvestment(request) {
  try {
    const response = await apiReturnCallBack("GET", investment, request);
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
export async function getInvestmentDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", investmentDetails, request);
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
export async function createInvestment(request) {
  try {
    const response = await apiReturnCallBack("POST", investment, request);
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
export async function updateInvestment(request, investmentId) {
  try {
    const response = await apiReturnCallBack("PUT", investment+`/${investmentId}`, request);
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