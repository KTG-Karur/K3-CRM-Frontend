import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const employeeLedger = apiContainer.employeeLedger
const customerLedger = apiContainer.customerLedger
const ledgerDetails = apiContainer.ledgerDetails
//GET--->
export async function getEmployeeLedger(request) {
  try {
    const response = await apiReturnCallBack("GET", employeeLedger, request);
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
export async function getCustomerLedger(request) {
  try {
    const response = await apiReturnCallBack("GET", customerLedger, request);
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
export async function getLedgerDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", ledgerDetails, request);
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