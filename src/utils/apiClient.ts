// utils/apiClient.js
import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json"
  },
});

// Sử dụng interceptors để cập nhật token trước mỗi request
apiClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("accessToken");  
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor để xử lý response, bao gồm làm mới token nếu cần
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(new Error("No refresh token available"));
      }

      try {
        const response = await axios.post("http://localhost:8080/auth/refreshToken", { token: refreshToken });
        const newAccessToken = response.data.result.accessToken;
        const newRefreshToken = response.data.result.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Cập nhật header Authorization với token mới
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;

        // Thử gửi lại request với token mới
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default apiClient;
