import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "@/constants/theme";
import useJournalEntriesStore from "@/state/useJournalEntriesStore";
import useUserStore from "@/state/useUserStore";

export default function Index() {
  const { fetchEntries } = useJournalEntriesStore();
  const { fetchProfile, user } = useUserStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("refreshToken");
      if (token) {
        fetchProfile();
        fetchEntries({ page: 1 });
        if (user.email.length > 0) {
          router.replace("/tabs/");
        } else router.replace("/auth");
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
      <ActivityIndicator color={colors.backgroundLight} size={"large"} />
    </View>
  );
}
