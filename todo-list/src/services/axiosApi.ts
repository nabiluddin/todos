import axios from "axios";

export const AxiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  withCredentials: true
})