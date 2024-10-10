import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BookHeart } from "lucide-react-native";
import { colors, spacing, textStyles } from "@/constants/theme";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          gap: spacing.medium,
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.extraLarge,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookHeart strokeWidth={1.2} size={48} color={colors.primary} />
        </View>
        <Text style={[textStyles.heading, { textAlign: "center" }]}>
          Welcome To Gourney
        </Text>
        <Text style={[textStyles.body, { textAlign: "center" }]}>
          Sign up or log in to begin your journey of mindful journaling.
        </Text>
      </View>
    </SafeAreaView>
  );
}
