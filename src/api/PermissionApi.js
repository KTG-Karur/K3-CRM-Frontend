import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const permission = apiContainer.permission
//GET--->
export async function getPermission(request) {
  try {
    const response = await apiReturnCallBack("GET", permission, request);
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
export async function createPermission(request) {
  
  try {
    const response = await apiReturnCallBack("POST", permission, request);
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
export async function updatePermission(request, permissionId) {
  try {
    const response = await apiReturnCallBack("PUT", permission+`/${permissionId}`, request);
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
// export async function deletePermission(permissionId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", permission+`/${permissionId}`);
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

