import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, defaultStyling, spacing, textStyles } from "@/constants/theme";
import GoogleIcon from "@/assets/google.svg";
import FacebookIcon from "@/assets/facebook.svg";
import AppleIcon from "@/assets/apple.svg";

const LoginForm = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
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
        <View style={{ gap: spacing.small }}>
          <Text style={[textStyles.body, { color: colors.textLight }]}>
            Your email address
          </Text>
          <TextInput
            style={[defaultStyling.defaultInput]}
            placeholder="johndoe@mail.com"
            placeholderTextColor={"rgba(0,0,0,0.33)"}
          />
        </View>
        <View style={{ gap: spacing.small }}>
          <Text style={[textStyles.body, { color: colors.textLight }]}>
            Your password
          </Text>
          <View style={[defaultStyling.defaultInput]}>
            <TextInput
              placeholder="***********"
              placeholderTextColor={"rgba(0,0,0,0.33)"}
              secureTextEntry={passwordHidden}
            />
          </View>
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

      <TouchableOpacity style={[defaultStyling.primaryButton]}>
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

export default LoginForm;

const styles = StyleSheet.create({});
