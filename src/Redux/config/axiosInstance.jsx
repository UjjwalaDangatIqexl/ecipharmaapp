import axios from "axios";
import { toast } from "react-toastify";
import {
  clearToken,
  hasRefreshToken,
  hasToken,
  saveToken,
} from "../../utils/auth";
import { apiBasePath } from "./config";

export const axiosInstance = axios.create({
  baseURL: apiBasePath,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = hasRefreshToken();
    const response = await axios.post(`${apiBasePath}/auth/refreshToken`, {
      refreshToken,
    });
    const newAccessToken = response.data.token;
    const newRefreshToken = response.data.refreshToken;
    saveToken(newAccessToken, newRefreshToken);
    return newAccessToken;
  } catch (error) {
    clearToken();
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = hasToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response &&
      error.response.status === 401 &&
      !error?.response?.data?.status?.message &&
      !originalRequest._retry
    ) {
      try {
        originalRequest._retry = true;
        const newAccessToken = await refreshAccessToken();
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        throw new Error("refreshError");
      }
    }

    if (
      error?.response &&
      error?.response?.data?.status?.message &&
      error?.config?.url !== "/stripe/payment/postTransactionStatus" &&
      !originalRequest._retry
    ) {
      toast.error(error?.response?.data?.status?.message, {
        toastId: 1,
      });
    }

    return Promise.reject(error);
  }
);
