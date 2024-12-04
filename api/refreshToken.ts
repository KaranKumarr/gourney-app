// import memoize from "memoize";
import { axiosPublic } from "./axiosPublic";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

export const refreshTokenFn = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  try {
    const url = `${API_URL}auth/refresh`;
    const headers = {
      authorization: `Bearer ${refreshToken}`,
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      connection: "keep-alive",
      "content-length": "0",
    };
    const response = await axiosPublic.get(url, { headers: headers });
    const { data } = response.data;

    if (!data?.accessToken) {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("user");
    }

    await AsyncStorage.setItem("accessToken", data.accessToken);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);

    return data;
  } catch (error) {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
  }
};

// const maxAge = 10000;
//
// export const memoizedRefreshToken = memoize(refreshTokenFn, {
//   maxAge,
// });
