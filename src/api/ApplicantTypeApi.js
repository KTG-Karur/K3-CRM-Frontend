import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const applicantType = apiContainer.applicantType
//GET--->
export async function getApplicantType(request) {
  try {
    const response = await apiReturnCallBack("GET", applicantType, request);
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
export async function createApplicantType(request) {
  try {
    const response = await apiReturnCallBack("POST", applicantType, request);
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
export async function updateApplicantType(request, applicantTypeId) {
  try {
    const response = await apiReturnCallBack("PUT", applicantType+`/${applicantTypeId}`, request);
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
// export async function deleteApplicantType(applicantTypeId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", applicantType+`/${applicantTypeId}`);
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

