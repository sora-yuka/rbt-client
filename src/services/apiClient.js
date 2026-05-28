import axios from "axios";
import { tokenService } from "./tokenServices";

const baseURL = import.meta.VITE_API_URL;

const apiClient = axios.create({ baseURL: baseURL });

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originRequest = error.config;

    if (error.response?.status === 401 && !originRequest._retry) {
      originRequest._retry = true;

      try {
        const refreshToken = tokenService.getRefreshToken();

        const response = await axios.post(`${baseURL}/api/v1/refresh/`, {
          refreshToken: refreshToken,
        });

        const { accessToken, newRefreshToken } = response.data;

        tokenService.setTokens(accessToken, newRefreshToken || refreshToken);
        originRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originRequest);
      } catch (refreshToken) {
        tokenService.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
