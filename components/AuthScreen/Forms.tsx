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

const Forms = () => {
  const [isLogin, setIsLogin] = useState(true);

  const leftPos = useSharedValue<number>(0);

  const animatedStyles = useAnimatedStyle(() => ({
    left: withSpring(leftPos.value),
  }));

  useEffect(() => {
    if (!isLogin) {
      leftPos.value += Dimensions.get("screen").width / 2;
    } else {
      leftPos.value = 0;
    }
  }, [isLogin]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{
            padding: spacing.small,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
          onPress={() => setIsLogin(true)}
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

        <TouchableOpacity
          onPress={() => setIsLogin(false)}
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
              { color: !isLogin ? colors.primary : colors.textLight },
            ]}
          >
            Sign Up
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
          padding: spacing.large,
        }}
      >
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </View>
    </View>
  );
};

export default Forms;
