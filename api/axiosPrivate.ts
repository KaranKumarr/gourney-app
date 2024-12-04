import axios from "axios";

import { refreshTokenFn } from "./refreshToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

axios.interceptors.request.use(
  async (config: any) => {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await refreshTokenFn();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.accessToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  },
);

export const axiosPrivate = axios;
