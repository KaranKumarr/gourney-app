import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_GOURNEY_API_URL;

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
