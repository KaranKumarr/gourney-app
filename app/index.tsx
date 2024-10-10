import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/AuthScreen/Header";
import Forms from "@/components/AuthScreen/Forms";
import { colors } from "@/constants/theme";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundLight,
      }}
    >
      <Header />
      <Forms />
    </SafeAreaView>
  );
}
