import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const activity = apiContainer.activity
//GET--->
export async function getActivity(request) {
  try {
    const response = await apiReturnCallBack("GET", activity, request);
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
export async function createActivity(request) {
  try {
    const response = await apiReturnCallBack("POST", activity, request);
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
export async function updateActivity(request, activityId) {
  try {
    const response = await apiReturnCallBack("PUT", activity+`/${activityId}`, request);
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
// export async function deleteActivity(activityId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", activity+`/${activityId}`);
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

