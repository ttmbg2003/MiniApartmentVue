import axios from 'axios';
import type { AxiosInstance } from 'axios';

const API_URL = "http://localhost:8080/";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
