// Import necessary packages
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";

// Define your API and identity URLs
const API_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

export const ApiClient = () => {
  // Create a new axios instance
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to add the JWT token to the authorization header
  api.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  createAxiosResponseInterceptor();

  function createAxiosResponseInterceptor() {
    const interceptor = api.interceptors.response.use(
      (response) => {
        console.log(`Data fetched`);
        return response;
      },
      async (error) => {
        // Reject promise if usual error
        if (error.response?.status !== 401) {
          return Promise.reject(error);
        }
        if (
          error.response?.status === 401 &&
          (await AsyncStorage.getItem("refreshToken"))
        ) {
          try {
            api.interceptors.response.eject(interceptor);

            const refreshToken = await AsyncStorage.getItem("refreshToken");
            console.log(
              "Error at API AXIOS",
              error.response?.status,
              refreshToken
            );

            const url = `${API_URL}auth/refresh`;
            const headers = {
              authorization: `Bearer ${refreshToken}`,
              accept: "*/*",
              "accept-encoding": "gzip, deflate, br",
              connection: "keep-alive",
              "content-length": "0",
            };
            const response = await axios.get(url, { headers: headers });
            await AsyncStorage.setItem(
              "accessToken",
              "Bearer " + response.data.accessToken
            );
            await AsyncStorage.setItem(
              "refreshToken",
              response.data.refreshToken
            );

            error.response.config.headers["Authorization"] =
              "Bearer " + response.data.accessToken;
            return axios(error.response.config);
          } catch (err: any) {
            //If refresh token is invalid, you will receive this error status and log user out
            if (err.response?.status === 400) {
              throw { response: { status: 401 } };
            }
            return Promise.reject(err);
          } finally {
            createAxiosResponseInterceptor;
          }
        }
      }
    );
  }

  const get = (path: string, params: any) => {
    return api.get(path, { params }).then((response) => response);
  };

  const post = (
    path: string,
    body: any,
    params: AxiosRequestConfig<any> | undefined
  ) => {
    return api.post(path, body, params).then((response) => response);
  };

  const put = (
    path: string,
    body: any,
    params: AxiosRequestConfig<any> | undefined
  ) => {
    return api.put(path, body, params).then((response) => response);
  };

  const patch = (
    path: string,
    body: any,
    params: AxiosRequestConfig<any> | undefined
  ) => {
    return api.patch(path, body, params).then((response) => response);
  };

  const del = (path: string) => {
    return api.delete(path).then((response) => response);
  };

  return {
    get,
    post,
    patch,
    put,
    del,
  };
};
