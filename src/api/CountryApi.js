import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const country = apiContainer.country
//GET--->
export async function getCountry(request) {
  try {
    const response = await apiReturnCallBack("GET", country, request);
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
export async function createCountry(request) {
  try {
    const response = await apiReturnCallBack("POST", country, request);
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
export async function updateCountry(request, countryId) {
  try {
    const response = await apiReturnCallBack("PUT", country+`/${countryId}`, request);
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
// export async function deleteCountry(countryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", country+`/${countryId}`);
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

