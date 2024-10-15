import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { colors, textStyles } from "@/constants/theme";
import useJournalEntriesStore from "@/state/useJournalEntriesStore";

export default function Index() {
  const { fetchEntries } = useJournalEntriesStore();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        await fetchEntries(token);
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
