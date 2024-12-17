export const baseURL = 'https://crmapi.repatriatepeoples.com';
// export const baseURL = 'http://localhost:5059';
// export const baseURL = 'http://localhost:5007'; // 5007 is live port
// const ports = '5059';

const getBaseUrl = (url) => {
  //   if (url === "login" || url.includes("employee-management")) {
  //     return `${baseURL}${ports}${url}`;
  //   }
  return `${baseURL}${url}`;
};

export function apiReturnCallBack(method, url, object = null, config = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'If-Modified-Since': 0,
    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZlbnNyaW5pMDQxNEBnbWFpbC5jb20iLCJpYXQiOjE3MjU0MjkzMzB9.eSEH9zugtZvJ5dmrcjOmfDX23wvuS7sriabNXuaSF6Y'
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