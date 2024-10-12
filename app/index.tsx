import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { colors, textStyles } from "@/constants/theme";

export default function Index() {
  useEffect(() => {
    const fetchToken = async () => {
      const access_token = await AsyncStorage.getItem("access_token");
      if (access_token) {
        router.replace("/tabs/");
      } else {
        router.replace("/auth");
      }
    };
    fetchToken();
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ ...textStyles.heading, color: colors.backgroundLight }}>
        Loading...
      </Text>
    </View>
  );
}
