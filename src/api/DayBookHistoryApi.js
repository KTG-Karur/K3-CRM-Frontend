import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const dayBookHistory = apiContainer.dayBookHistory
//GET--->
export async function getDayBookHistory(request) {
  try {
    const response = await apiReturnCallBack("GET", dayBookHistory, request);
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
export async function createDayBookHistory(request) {
  try {
    const response = await apiReturnCallBack("POST", dayBookHistory, request);
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
export async function updateDayBookHistory(request, dayBookHistoryId) {
  try {
    const response = await apiReturnCallBack("PUT", dayBookHistory+`/${dayBookHistoryId}`, request);
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
// export async function deleteDayBookHistory(dayBookHistoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", dayBookHistory+`/${dayBookHistoryId}`);
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

