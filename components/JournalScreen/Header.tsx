import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { spacing, colors, defaultStyling } from "@/constants/theme";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

const Header = ({
  submit,
  buttonText,
}: {
  submit: () => Promise<void>;
  buttonText?: string | null;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacing.medium,
        paddingTop: spacing.small / 2,
        paddingHorizontal: spacing.medium,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <ChevronLeft height={32} width={32} color={colors.neutralLight} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          defaultStyling.primaryButton,
          {
            paddingVertical: spacing.small,
            flexDirection: "row",
          },
        ]}
        onPress={submit}
      >
        <Text style={[defaultStyling.primaryButtonText]}>
          {buttonText ? buttonText : "Done"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
