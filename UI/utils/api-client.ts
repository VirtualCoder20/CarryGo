import axios from 'axios';
import { secureStorage } from './secure-storage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.carrygo.com/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach the token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await secureStorage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401s and global errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: Implement refresh token logic here.
      // For now, if we get 401, we could remove the token to force relogin
      await secureStorage.removeToken();
    }
    return Promise.reject(error);
  }
);
