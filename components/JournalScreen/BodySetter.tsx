import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { EditorBridge, RichText, Toolbar } from "@10play/tentap-editor";

const BodySetter = ({ editor }: { editor: EditorBridge }) => {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default BodySetter;
