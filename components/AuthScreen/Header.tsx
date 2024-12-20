import { View, Text } from "react-native";
import { BookHeart } from "lucide-react-native";
import { spacing, colors, textStyles } from "@/constants/theme";
import React from "react";

const Header = () => {
  return (
    <View
      style={{
        gap: spacing.medium,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.large,
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
  );
};

export default Header;
