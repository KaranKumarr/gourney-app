import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors, defaultStyling, spacing, textStyles } from "@/constants/theme";
import GoogleIcon from "@/assets/google.svg";
import FacebookIcon from "@/assets/facebook.svg";
import AppleIcon from "@/assets/apple.svg";
import { Eye, EyeClosed } from "lucide-react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { validateEmail } from "@/constants/validate";
import { showMessage } from "react-native-flash-message";
import { router } from "expo-router";

const API_URL = `${process.env.EXPO_PUBLIC_GOURNEY_API_URL}auth/login`;

const LoginForm = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      showMessage({
        message: "All fields are required!",
        description: "Please fill out the email and password.",
        type: "danger",
      });
      return;
    }

    if (validateEmail(email) === false) {
      showMessage({
        message: "Invalid Email",
        description:
          "That doesn’t look like a valid email. Double-check the format.",
        type: "danger",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase(), password }),
      });

      const data = await response.json();

      if (response.status !== 201) {
        showMessage({
          message: "Oops",
          description: data.message,
          type: "danger",
        });
        return;
      }

      router.replace("/tabs");
    } catch (error: any) {
      showMessage({
        message: "Oops",
        description: "Something went wrong with server.",
        type: "danger",
      });
      console.log(error);
    }
  };

  return (
    <Animated.View
      entering={FadeInRight.duration(150).delay(150)}
      exiting={FadeOutRight.duration(150)}
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <View style={{ gap: spacing.small }}>
        <Text style={[textStyles.subheading]}>Hello Again</Text>
        <Text
          style={[
            textStyles.body,
            {
              color: "#808080",
            },
          ]}
        >
          We have missed you. :(
        </Text>
      </View>
      <View style={{ gap: spacing.medium }}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[defaultStyling.defaultInput]}
          placeholder="Email"
          placeholderTextColor={"rgba(0,0,0,0.33)"}
        />
        <View style={[defaultStyling.defaultInput, { flexDirection: "row" }]}>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            placeholderTextColor={"rgba(0,0,0,0.33)"}
            secureTextEntry={passwordHidden}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
            {passwordHidden ? (
              <EyeClosed height={24} width={24} color={colors.neutralLight} />
            ) : (
              <Eye height={24} width={24} color={colors.neutralLight} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text
            style={[
              textStyles.body,
              { color: colors.neutralLight, textAlign: "right" },
            ]}
          >
            Recovery Password?
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        style={[defaultStyling.primaryButton]}
      >
        <Text style={[defaultStyling.primaryButtonText]}>Login</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.large,
        }}
      >
        <View
          style={{ height: 1, flex: 1, backgroundColor: colors.neutralLight }}
        />
        <Text style={[textStyles.smallText, { color: colors.neutralLight }]}>
          OR
        </Text>
        <View
          style={{ height: 1, flex: 1, backgroundColor: colors.neutralLight }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: spacing.medium,
          paddingBottom: spacing.small,
        }}
      >
        <TouchableOpacity
          style={{
            padding: spacing.small,
            backgroundColor: colors.backgroundLight,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GoogleIcon width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: spacing.small,
            backgroundColor: colors.backgroundLight,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppleIcon width={32} height={32} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: spacing.small,
            backgroundColor: colors.backgroundLight,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FacebookIcon width={32} height={32} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default LoginForm;
