import jwtDecode from 'jwt-decode';
import axios, { AxiosInstance } from 'axios';
import config from '../../config';

// Initialize Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios response interceptors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'An error occurred';
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    window.location.href = '/access-denied'; // Optional redirect
                    break;
                case 404:
                    message = 'Sorry! The data you are looking for could not be found';
                    window.location.href = '/access-denied'; // Optional redirect
                    break;
                default:
                    message = error || message;
            }
        } else {
            message = error || message;
        }

        return Promise.reject(message);
    }
);

const AUTH_SESSION_KEY = 'adminto_user';

const setAuthorization = (token: string | null) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const getUserFromSession = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? JSON.parse(user) : null;
};

class APICore {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axiosInstance;

        // Initialize token if available
        const user = getUserFromSession();
        if (user?.token) {
            setAuthorization(user.token);
        }
    }

    get(url: string, params?: any) {
        const queryString = params ? new URLSearchParams(params).toString() : '';
        return this.instance.get(`${url}${queryString ? `?${queryString}` : ''}`);
    }

    getFile(url: string, params?: any) {
        const queryString = params ? new URLSearchParams(params).toString() : '';
        return this.instance.get(`${url}${queryString ? `?${queryString}` : ''}`, { responseType: 'blob' });
    }

    getMultiple(urls: string[], params?: any) {
        const queryString = params ? new URLSearchParams(params).toString() : '';
        const requests = urls.map((url) => this.instance.get(`${url}${queryString ? `?${queryString}` : ''}`));
        return axios.all(requests);
    }

    create(url: string, data: any) {
        return this.instance.post(url, data);
    }

    updatePatch(url: string, data: any) {
        return this.instance.patch(url, data);
    }

    update(url: string, data: any) {
        return this.instance.put(url, data);
    }

    delete(url: string) {
        return this.instance.delete(url);
    }

    createWithFile(url: string, data: any) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));

        return this.instance.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    updateWithFile(url: string, data: any) {
        const formData = new FormData();
        Object.keys(data).forEach((key) => formData.append(key, data[key]));

        return this.instance.put(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }

    isUserAuthenticated() {
        const user = this.getLoggedInUser();

        if (!user) {
            return false;
        }

        const decoded: any = jwtDecode(user.token);
        return decoded.exp > Date.now() / 1000;
    }

    setLoggedInUser(session: any) {
        if (session) {
            sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        } else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    }

    getLoggedInUser() {
        return getUserFromSession();
    }

    setUserInSession(modifiedUser: any) {
        const userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    }
}

export { APICore, setAuthorization };
