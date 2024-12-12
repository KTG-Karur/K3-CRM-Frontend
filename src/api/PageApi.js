import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const page = apiContainer.page
//GET--->
export async function getPage(request) {
  try {
    const response = await apiReturnCallBack("GET", page, request);
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
export async function createPage(request) {
  
  try {
    const response = await apiReturnCallBack("POST", page, request);
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
export async function updatePage(request, pageId) {
  try {
    const response = await apiReturnCallBack("PUT", page+`/${pageId}`, request);
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
// export async function deletePage(pageId) {
//   try {
//     const response = await apiReturnCallBack("DELETE", page+`/${pageId}`);
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

