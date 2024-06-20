// src/auth.js
import { reactive } from "vue";

export const authState = reactive({
  isAuthenticated: !!localStorage.getItem("token"),
});

export const login = (token: string) => {
  localStorage.setItem("token", token);
  authState.isAuthenticated = true;
};

export const logout = () => {
  localStorage.removeItem("token");
  authState.isAuthenticated = false;
};
