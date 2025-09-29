import axios from "axios";
import { getError } from "./errorMap";
import LogtoService from "../logto/LogtoService";

const logtoService = new LogtoService();

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = await logtoService.getTokenAuth();
    console.log(accessToken)
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => {
    console.error("Error in request interceptor", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(undefined, (error) => {
  console.groupCollapsed(`🛑 ${error.config?.method?.toUpperCase()} ${error.config?.url} → ${error.response?.status ?? 'NETWORK'}`);
  console.log("request data:", error.config?.data);
  console.log("payload:", error.config.response);
  console.log("config:", error.config);
  console.groupEnd();
  const mappedError = getError(error);
  return mappedError
    ? Promise.reject(mappedError)
    : Promise.reject(new Error(error));
});

export default axiosClient;
