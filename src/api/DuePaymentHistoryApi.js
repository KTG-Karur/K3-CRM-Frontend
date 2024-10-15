import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const duePaymentHistory = apiContainer.duePaymentHistory
const investorDuePaymentHistory = apiContainer.investorDuePaymentHistory
const investorDuePaymentDetails = apiContainer.investorDuePaymentDetails
//GET--->
export async function getDuePaymentHistory(request) {
  try {
    const response = await apiReturnCallBack("GET", duePaymentHistory, request);
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
export async function getInvestorDuePaymentHistory(request) {
  try {
    const response = await apiReturnCallBack("GET", investorDuePaymentHistory, request);
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
export async function getInvestorDuePaymentDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", investorDuePaymentDetails, request);
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
export async function createDuePaymentHistory(request) {
  try {
    const response = await apiReturnCallBack("POST", duePaymentHistory, request);
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
export async function updateDuePaymentHistory(request, duePaymentHistoryId) {
  try {
    const response = await apiReturnCallBack("PUT", duePaymentHistory+`/${duePaymentHistoryId}`, request);
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
// export async function deleteDuePaymentHistory(duePaymentHistoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", duePaymentHistory+`/${duePaymentHistoryId}`);
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

