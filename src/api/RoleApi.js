import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const role = apiContainer.role
//GET--->
export async function getRole(request) {
  try {
    const response = await apiReturnCallBack("GET", role, request);
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
export async function createRole(request) {
  try {
    const response = await apiReturnCallBack("POST", role, request);
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
export async function updateRole(request, roleId) {
  try {
    const response = await apiReturnCallBack("PUT", role+`/${roleId}`, request);
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
// export async function deleteRole(roleId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", role+`/${roleId}`);
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

