import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const staffTraining = apiContainer.staffTraining
//GET--->
export async function getStaffTraining(request) {
  try {
    const response = await apiReturnCallBack("GET", staffTraining, request);
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
export async function createStaffTraining(request) {
  try {
    const response = await apiReturnCallBack("POST", staffTraining, request);
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
export async function updateStaffTraining(request, staffTrainingId) {
  try {
    const response = await apiReturnCallBack("PUT", staffTraining+`/${staffTrainingId}`, request);
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
// export async function deleteStaffTraining(staffTrainingId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", staffTraining+`/${staffTrainingId}`);
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

