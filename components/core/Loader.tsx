import { View, Text, Dimensions, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";

const Loader = () => {
  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
        backgroundColor: "rgba(0,0,0,0.33)",
        position: "absolute",
        top: 0,
        left: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  );
};

export default Loader;
