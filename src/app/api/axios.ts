import axios from 'axios';
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from '../config';
import { StatusCodes } from 'http-status-codes';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    if (!!localStorage.getItem('accessToken')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`; 
    }
    return config;
  }
);

axiosInstance.interceptors.response.use(
  /**
   * Success response
   */
  async (response): Promise<AxiosResponse> => {
    return Promise.resolve(response);
  },

  /**
   * Error response
   */
  async (error: AxiosError)  => {
    const originalRequest: any = error.config!;
    if (error.request.status === StatusCodes.UNAUTHORIZED && error.config &&!originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw error;
        }
        const { data } = await axiosInstance.post(`/auth/refresh`, {refresh_token: refreshToken}, {withCredentials: true});
        localStorage.setItem('refreshToken', data.refresh_token);
        localStorage.setItem('accessToken', data.access_token);
        return axiosInstance.request(originalRequest);
      }
      catch (err) {
        console.log(err)
        window.location.reload();
      }
    }
    throw error;
  }
);

export default axiosInstance;
