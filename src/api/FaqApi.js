import { apiReturnCallBack } from './ApiConfig';
import apiContainer from './apiContainer';
const faq = apiContainer.faq
//GET--->
export async function getFaq(request) {
  try {
    const response = await apiReturnCallBack("GET", faq, request);
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
export async function createFaq(request) {
  try {
    const response = await apiReturnCallBack("POST", faq, request);
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
export async function updateFaq(request, faqId) {
  try {
    const response = await apiReturnCallBack("PUT", faq+`/${faqId}`, request);
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
export async function deleteFaq(faqId) {
  try {
    const response = await apiReturnCallBack("DELETE", faq+`/${faqId}`);
    if (!response.ok) {
      throw new Error(data.message || JSON.stringify(data));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

