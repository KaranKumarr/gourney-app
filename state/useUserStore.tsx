import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosPrivate } from "@/api/axiosPrivate";

const API_URL = `${process.env.EXPO_PUBLIC_GOURNEY_API_URL}user/profile`;
interface User {
  id: number;
  name: string;
  email: string;
}

type UserStore = {
  user: User;
  fetchProfile: () => void;
  updateProfile: (updatedUser: User) => void;
};

const useUserStore = create<UserStore>((set, get) => ({
  user: {
    id: -1,
    name: "",
    email: "",
  }, // Initial state

  fetchProfile: async () => {
    try {
      const res = await axiosPrivate.get(API_URL);
      const data: User = res.data;
      console.log("fetchProfile");
      console.log(data);

      if (data) {
        await AsyncStorage.setItem("user", JSON.stringify(data));
        set({ user: data });
      } else {
        const user = await AsyncStorage.getItem("user");
        console.log(user);
        if (user) set({ user: JSON.parse(user) });
      }
    } catch (error: any) {
      // Handle errors, including token-related errors
      console.error("API Error fetchProfile:", error);
      console.error("API Error fetchProfile:", error.message);
      const user = await AsyncStorage.getItem("user");
      if (user) set({ user: JSON.parse(user) });
    }
  },

  //  Update a user by id
  updateProfile: (updatedUser: User) => set({ user: updatedUser }),
}));

export default useUserStore;
