import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const employeeLogin = apiContainer.employeeLogin
//GET--->
export async function getEmployeeLogin(request) {
  try {
    const response = await apiReturnCallBack("GET", employeeLogin, request);
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