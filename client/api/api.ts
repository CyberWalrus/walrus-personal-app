import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const SERVER_URL = `http://localhost:1337`;
export const ERROR_STATUSES = [404, 500, 503, 504];

const configureAPI = (onServerError: () => void): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${SERVER_URL}/api`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse): AxiosResponse => response;

  instance.interceptors.response.use(onSuccess);

  return instance;
};

export default configureAPI;
