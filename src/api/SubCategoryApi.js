import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const subCategory = apiContainer.subCategory
//GET--->
export async function getSubCategory(request) {
  try {
    const response = await apiReturnCallBack("GET", subCategory, request);
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
export async function createSubCategory(request) {
  try {
    const response = await apiReturnCallBack("POST", subCategory, request);
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
export async function updateSubCategory(request, subCategoryId) {
  try {
    const response = await apiReturnCallBack("PUT", subCategory+`/${subCategoryId}`, request);
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
// export async function deleteSubCategory(subCategoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", subCategory+`/${subCategoryId}`);
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

