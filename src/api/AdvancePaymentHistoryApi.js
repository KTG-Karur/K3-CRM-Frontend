import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const advancePaymentHistory = apiContainer.advancePaymentHistory
//GET--->
export async function getAdvancePaymentHistory(request) {
  try {
    const response = await apiReturnCallBack("GET", advancePaymentHistory, request);
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
export async function createAdvancePaymentHistory(request) {
  try {
    const response = await apiReturnCallBack("POST", advancePaymentHistory, request);
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
export async function updateAdvancePaymentHistory(request, advancePaymentHistoryId) {
  try {
    const response = await apiReturnCallBack("PUT", advancePaymentHistory+`/${advancePaymentHistoryId}`, request);
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
// export async function deleteAdvancePaymentHistory(advancePaymentHistoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", advancePaymentHistory+`/${advancePaymentHistoryId}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     throw error;
//   }
// }

