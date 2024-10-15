import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const category = apiContainer.category
//GET--->
export async function getCategory(request) {
  try {
    const response = await apiReturnCallBack("GET", category, request);
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
export async function createCategory(request) {
  try {
    const response = await apiReturnCallBack("POST", category, request);
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
export async function updateCategory(request, categoryId) {
  try {
    const response = await apiReturnCallBack("PUT", category+`/${categoryId}`, request);
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
// export async function deleteCategory(categoryId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", category+`/${categoryId}`);
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

