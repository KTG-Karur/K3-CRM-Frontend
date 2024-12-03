import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const rolePermission = apiContainer.rolePermission
//GET--->
export async function getRolePermission(request) {
  try {
    const response = await apiReturnCallBack("GET", rolePermission, request);
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
export async function createRolePermission(request) {
  
  try {
    const response = await apiReturnCallBack("POST", rolePermission, request);
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
export async function updateRolePermission(request, rolePermissionId) {
  try {
    const response = await apiReturnCallBack("PUT", rolePermission+`/${rolePermissionId}`, request);
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
// export async function deleteRolePermission(rolePermissionId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", rolePermission+`/${rolePermissionId}`);
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

