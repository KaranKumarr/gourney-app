import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { spacing, textStyles, defaultStyling, colors } from "@/constants/theme";
import GoogleIcon from "@/assets/google.svg";
import FacebookIcon from "@/assets/facebook.svg";
import AppleIcon from "@/assets/apple.svg";
import { Eye, EyeClosed } from "lucide-react-native";

const SignUpForm = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
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
          style={[defaultStyling.defaultInput]}
          placeholder="Name"
          placeholderTextColor={"rgba(0,0,0,0.33)"}
        />

        <TextInput
          style={[defaultStyling.defaultInput]}
          placeholder="Email"
          placeholderTextColor={"rgba(0,0,0,0.33)"}
        />
        <View style={[defaultStyling.defaultInput, { flexDirection: "row" }]}>
          <TextInput
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

      <TouchableOpacity style={[defaultStyling.primaryButton]}>
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
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
