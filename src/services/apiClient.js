import axios from "axios";
import { tokenService } from "./tokenServices";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

        const response = await axios.post(`${baseURL}/api/v1/users/refresh/`, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        tokenService.setTokens(access, refresh || refreshToken);
        originRequest.headers.Authorization = `Bearer ${access}`;
        return apiClient(originRequest);
      } catch (refreshError) {
        tokenService.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
