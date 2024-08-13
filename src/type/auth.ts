import apiClient from "@/utils/apiClient";
import axios from "axios";
import { reactive } from "vue";

export const authState = reactive({
  isAuthenticated: !!(localStorage.getItem("accessToken") && localStorage.getItem("accessToken") != 'undefined'),
});

export const login = (accessToken: any, refreshToken: any) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  authState.isAuthenticated = true;
};

export const logout = async () => {
  const accessToken = localStorage.getItem("accessToken")
  await axios({
    method: "get",
    url: 'http://localhost:8080/auth/deleteToken',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  authState.isAuthenticated = false;
};