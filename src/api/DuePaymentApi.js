import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const duePayment = apiContainer.duePayment
const duePaymentDetails = apiContainer.duePaymentDetails
//GET--->
export async function getDuePayment(request) {
  try {
    const response = await apiReturnCallBack("GET", duePayment, request);
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
export async function getDuePaymentDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", duePaymentDetails, request);
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
export async function createDuePayment(request) {
  try {
    const response = await apiReturnCallBack("POST", duePayment, request);
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
export async function updateDuePayment(request, duePaymentId) {
  try {
    const response = await apiReturnCallBack("PUT", duePayment+`/${duePaymentId}`, request);
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
// export async function deleteDuePayment(duePaymentId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", duePayment+`/${duePaymentId}`);
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

