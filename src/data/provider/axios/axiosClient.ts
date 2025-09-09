import axios from "axios";
import { getError } from "./errorMap";

const axiosClient = axios.create({
  baseURL: ""
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers.setUserAgent("SERVER APPARCA");
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

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
