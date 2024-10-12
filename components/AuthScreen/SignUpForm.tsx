import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { spacing, textStyles, defaultStyling, colors } from "@/constants/theme";
import GoogleIcon from "@/assets/google.svg";
import FacebookIcon from "@/assets/facebook.svg";
import AppleIcon from "@/assets/apple.svg";
import { Eye, EyeClosed } from "lucide-react-native";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { showMessage } from "react-native-flash-message";
import { validateEmail, validatePassword } from "@/constants/validate";
// import { router } from "expo-router";

const API_URL = `${process.env.EXPO_PUBLIC_GOURNEY_API_URL}auth/register`;

const SignUpForm = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      showMessage({
        message: "All fields are required!",
        description: "Please fill out the name, email, and password.",
        type: "danger", // Use 'danger' for error message
      });
      return;
    }

    if (validateEmail(email) === false) {
      showMessage({
        message: "Invalid Email",
        description:
          "Oops! That doesn’t look like a valid email. Double-check the format.",
        type: "danger", // Use 'danger' for error message
      });
      return;
    }

    if (validatePassword(password) === false) {
      showMessage({
        message: "Invalid Password",
        description:
          "Password must be 1-6 characters long with at least one uppercase letter and one digit.",
        type: "danger", // Use 'danger' for error message
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
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
          name: name.trim(),
        }),
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

      // router.replace("/tabs");
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
      entering={FadeInLeft.duration(150).delay(150)}
      exiting={FadeOutLeft.duration(150)}
      style={{ flex: 1, justifyContent: "space-between" }}
    >
      <View style={{ gap: spacing.small }}>
        <Text style={[textStyles.subheading]}>Create new account</Text>
        <Text
          style={[
            textStyles.body,
            {
              color: "#808080",
            },
          ]}
        >
          and start your Gourney. :)
        </Text>
      </View>
      <View style={{ gap: spacing.medium }}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={[defaultStyling.defaultInput]}
          placeholder="Name"
          placeholderTextColor={"rgba(0,0,0,0.33)"}
        />

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
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        style={[defaultStyling.primaryButton]}
      >
        <Text style={[defaultStyling.primaryButtonText]}>Sign Up</Text>
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

export default SignUpForm;
