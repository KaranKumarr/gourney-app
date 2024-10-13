import { View, Text, ScrollView } from "react-native";
import React from "react";
import { colors } from "@/constants/theme";
import TopBar from "@/components/core/TopBar";

const Home = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <TopBar />
      <Text>shas</Text>
    </View>
  );
};

export default Home;
