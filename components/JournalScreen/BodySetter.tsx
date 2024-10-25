import { View, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import React from "react";
import { EditorBridge, RichText, Toolbar } from "@10play/tentap-editor";
import { colors, spacing } from "@/constants/theme";

const BodySetter = ({ editor }: { editor: EditorBridge }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.medium,
      }}
    >
      <RichText
        style={{
          backgroundColor: colors.backgroundLight,
        }}
        editor={editor}
      />
      <KeyboardAvoidingView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: Dimensions.get("screen").width,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default BodySetter;
