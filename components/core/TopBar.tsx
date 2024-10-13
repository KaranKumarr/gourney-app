import { View, StatusBar } from "react-native";
import React from "react";
import { spacing, colors } from "@/constants/theme";
import { Menu, Search } from "lucide-react-native";

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
      <Search color={colors.neutralLight} height={24} width={24} />
    </View>
  );
};

export default TopBar;
