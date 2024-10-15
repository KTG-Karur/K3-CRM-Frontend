import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const bankAccount = apiContainer.bankAccount
//GET--->
export async function getBankAccount(request) {
  try {
    const response = await apiReturnCallBack("GET", bankAccount, request);
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
export async function createBankAccount(request) {
  try {
    const response = await apiReturnCallBack("POST", bankAccount, request);
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
export async function updateBankAccount(request, bankAccountId) {
  try {
    const response = await apiReturnCallBack("PUT", bankAccount+`/${bankAccountId}`, request);
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
// export async function deleteBankAccount(bankAccountId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", bankAccount+`/${bankAccountId}`);
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