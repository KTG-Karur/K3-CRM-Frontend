import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const uploadImages = apiContainer.uploadImages

//CREATE---->
export async function createUploadImages(request) {
  try {
    const response = await apiReturnCallBack("FORMPOST", uploadImages, request);
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

