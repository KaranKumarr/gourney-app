import { create } from "zustand";
import { ApiClient } from "@/constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiPath = ApiClient();

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
    apiPath
      .get("user/profile", null)
      .then((response) => {
        const data: User = response.data;
        AsyncStorage.setItem("user", JSON.stringify(data));
        console.log("backend");
        console.log(data);
        set({ user: data });
      })
      .catch(async (error) => {
        // Handle errors, including token-related errors
        console.error("API Error:", error);
        console.error("API Error:", error.message);
        const user = await AsyncStorage.getItem("user");
        console.log("AsyncStorage");
        console.log(user);
        if (user) set({ user: JSON.parse(user) });
      });
  },

  //  Update an user by id
  updateProfile: (updatedUser: User) => set({ user: updatedUser }),
}));

export default useUserStore;
