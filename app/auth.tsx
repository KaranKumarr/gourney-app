import { SafeAreaView, ScrollView } from "react-native";
import Forms from "@/components/AuthScreen/Forms";
import { colors } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/AuthScreen/Header";
import React from "react";

const Auth = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.backgroundLight,
        }}
      >
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
    </GestureHandlerRootView>
  );
};

export default Auth;
