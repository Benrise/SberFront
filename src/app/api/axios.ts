import axios from 'axios';
import { type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    if (!!localStorage.getItem('accessToken')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`; 
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
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
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
