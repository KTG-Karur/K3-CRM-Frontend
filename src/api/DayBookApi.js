import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const dayBook = apiContainer.dayBook
//GET--->
export async function getDayBook(request) {
  try {
    const response = await apiReturnCallBack("GET", dayBook, request);
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
export async function createDayBook(request) {
  try {
    const response = await apiReturnCallBack("POST", dayBook, request);
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
export async function updateDayBook(request, dayBookId) {
  try {
    const response = await apiReturnCallBack("PUT", dayBook+`/${dayBookId}`, request);
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
// export async function deleteDayBook(dayBookId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", dayBook+`/${dayBookId}`);
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

