import { Stack } from "expo-router";
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import FlashMessage from "react-native-flash-message";
import React from "react";
import { StatusBar } from "react-native";
import "@/styles/global.css";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  StatusBar.setBarStyle("dark-content");

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tabs" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="journal/[id]" />
      </Stack>
      <FlashMessage position="bottom" />
    </>
  );
}
