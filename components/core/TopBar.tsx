import { View, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { spacing, colors } from "@/constants/theme";
import { Menu, Search } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { axiosPrivate } from "@/api/axiosPrivate";
import { BASE_API_URL } from "@/constants/constants";
import { axiosPublic } from "@/api/axiosPublic";

const TopBar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: StatusBar.currentHeight,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.medium,
        backgroundColor: colors.backgroundLight,
        alignItems: "center",
      }}
    >
      <Menu color={colors.neutralLight} height={28} width={28} />
      <TouchableOpacity
        onPress={async () => {
          const user = await AsyncStorage.getItem("user");
          console.log(user);
          if (user) {
            try {
              await axiosPublic.post(BASE_API_URL + "auth/logout", {
                userId: JSON.parse(user).id,
              });
            } catch (e: any) {
              console.error(e);
              console.error(e.message);
            }
            router.dismissAll();
            router.push("/auth");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("refreshToken");
            await AsyncStorage.removeItem("accessToken");
          }
        }}
      >
        <Search color={colors.neutralLight} height={24} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
