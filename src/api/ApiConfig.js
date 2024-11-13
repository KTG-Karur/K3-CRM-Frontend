const baseURL = 'http://localhost:5059';
// const ports = '5059';

const getBaseUrl = (url) => {
  //   if (url === "login" || url.includes("employee-management")) {
  //     return `${baseURL}${ports}${url}`;
  //   }
  return `${baseURL}${url}`;
};

const loginData = sessionStorage.getItem('loginInfo');
let tokenData = null;

if (loginData) {
  try {
    tokenData = JSON.parse(loginData);
  } catch (error) {
    console.error("Error parsing login data:", error);
  }
}

const getAuthHeader = () => {
  if (tokenData && tokenData.token) {
    return { 'Authorization': `Bearer ${tokenData.token}` };
  }
  return {}; // Return an empty object if no token is available
};

export function apiReturnCallBack(method, url, object = null, config = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'If-Modified-Since': 0,
    ...getAuthHeader(),
  };

  const fetchConfig = {
    method,
    headers,
    ...config,
  };

  if (object) {
    if (method === 'FORMPUT' || method === 'FORMPOST') {
      // const formData = new FormData();
      // Object.keys(object).forEach((key) => {
      //   formData.append(key, object[key]);
      // });
      fetchConfig.method = 'POST';
      fetchConfig.body = object;
      delete fetchConfig.headers['Content-Type'];
      // fetchConfig.headers['Content-Type'] = 'multipart/form-data';
      // fetchConfig.headers['content-type'] = 'multipart/form-data';
    } else if (method === 'GET') {
      const queryParams = new URLSearchParams(object).toString();
      url += `?${queryParams}`;
    } else {
      fetchConfig.body = JSON.stringify(object);
    }
  }
  return fetch(getBaseUrl(url), fetchConfig);
}