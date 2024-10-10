import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookHeart } from "lucide-react-native";
import { colors, spacing, textStyles } from "@/constants/theme";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: spacing.large,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing.small,
        }}
      >
        <BookHeart size={48} color={colors.primary} />
        <Text style={[textStyles.heading, { color: colors.primary }]}>
          Gourney
        </Text>
      </View>
    </SafeAreaView>
  );
}
