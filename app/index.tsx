import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/AuthScreen/Header";
import Forms from "@/components/AuthScreen/Forms";
import { colors } from "@/constants/theme";
import { ScrollView, StatusBar } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundLight,
      }}
    >
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Header />
        <Forms />
      </ScrollView>
    </SafeAreaView>
  );
}
