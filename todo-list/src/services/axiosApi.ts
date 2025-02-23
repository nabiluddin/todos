import axios from "axios";
import getEnvVariables from "../shared/projectEnvVariables";

const { envVariables } = getEnvVariables()

export const AxiosApi = axios.create({
  baseURL: envVariables.VITE_BACKEND_API,
  withCredentials: true
})
