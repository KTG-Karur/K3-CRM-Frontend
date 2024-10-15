import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const state = apiContainer.state
//GET--->
export async function getState(request) {
  try {
    const response = await apiReturnCallBack("GET", state, request);
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
export async function createState(request) {
  try {
    const response = await apiReturnCallBack("POST", state, request);
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
export async function updateState(request, stateId) {
  try {
    const response = await apiReturnCallBack("PUT", state+`/${stateId}`, request);
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
// export async function deleteState(stateId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", state+`/${stateId}`);
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

