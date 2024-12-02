import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const holiday = apiContainer.holiday
//GET--->
export async function getHoliday(request) {
  try {
    const response = await apiReturnCallBack("GET", holiday, request);
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
export async function createHoliday(request) {
  try {
    const response = await apiReturnCallBack("POST", holiday, request);
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
export async function updateHoliday(request, holidayId) {
  try {
    const response = await apiReturnCallBack("PUT", holiday+`/${holidayId}`, request);
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
// export async function deleteHoliday(holidayId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", holiday+`/${holidayId}`);
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

