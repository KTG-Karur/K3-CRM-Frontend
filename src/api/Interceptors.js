import axios from 'axios';


const base_url = process.env.REACT_APP_BASE_URL;

console.log("BASE_URL:", base_url);


const axiosInstance = axios.create({
    baseURL: base_url || 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error("Bad Request:", data);
                    break;
                case 401:
                    console.error("Unauthorized:", data);
                    break;
                case 403:
                    console.error("Forbidden:", data);
                    break;
                case 404:
                    console.error("Not Found:", data);
                    break;
                case 500:
                    console.error("Internal Server Error:", data);
                    break;
                default:
                    console.error(`Error ${status}:`, data);
                    break;
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error in setting up request:", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
