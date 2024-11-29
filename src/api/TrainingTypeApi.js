import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const trainingType = apiContainer.trainingType
//GET--->
export async function getTrainingType(request) {
  try {
    const response = await apiReturnCallBack("GET", trainingType, request);
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
export async function createTrainingType(request) {
  try {
    const response = await apiReturnCallBack("POST", trainingType, request);
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
export async function updateTrainingType(request, trainingTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", trainingType+`/${trainingTypeId}`, request);
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
// export async function deleteTrainingType(trainingTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", trainingType+`/${trainingTypeId}`);
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

