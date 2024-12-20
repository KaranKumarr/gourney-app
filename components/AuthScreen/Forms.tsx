import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { colors, spacing, textStyles } from "@/constants/theme";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import React from "react";

const Forms = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [lastGesture, setLastGesture] = useState(0);

  const leftPos = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    left: withSpring(leftPos.value),
  }));

  useEffect(() => {
    if (isLogin) {
      leftPos.value += Dimensions.get("screen").width / 2;
    } else {
      leftPos.value = 0;
    }
  }, [isLogin]);
  const handleGesture = (evt: GestureEvent<PanGestureHandlerEventPayload>) => {
    const delay = 300;

    // this makes sure animation doesn't face "bounce" issue
    if (lastGesture >= Date.now() - delay) return;
    setLastGesture(Date.now());

    const { nativeEvent } = evt;
    if (nativeEvent.velocityX > 0) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };
  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              padding: spacing.small,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
            onPress={() => setIsLogin(false)}
          >
            <Text
              style={[
                textStyles.body,
                { color: !isLogin ? colors.primary : colors.textLight },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsLogin(true)}
            style={{
              padding: spacing.small,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text
              style={[
                textStyles.body,
                { color: isLogin ? colors.primary : colors.textLight },
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              {
                height: 2,
                width: Dimensions.get("screen").width / 2,
                backgroundColor: colors.primary,
                position: "absolute",
                bottom: 0,
              },
              animatedStyles,
            ]}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.cardLight,
            flex: 1,
            paddingHorizontal: spacing.large,
            paddingVertical: spacing.medium,
          }}
        >
          {!isLogin ? <SignUpForm /> : <LoginForm />}
        </View>
      </View>
    </PanGestureHandler>
  );
};

export default Forms;
