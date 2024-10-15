import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const searchApplicant = apiContainer.searchApplicant
const searchApplicantDetails = apiContainer.searchApplicantDetails
//GET--->
export async function getSearchApplicant(request) {
  try {
    const response = await apiReturnCallBack("GET", searchApplicant, request);
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
export async function getSearchApplicantDetails(request) {
  try {
    const response = await apiReturnCallBack("GET", searchApplicantDetails, request);
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

