import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import { colors, spacing, textStyles } from "@/constants/theme";

const TitleSetter = ({
  defaultValue,
  onTitleChange,
}: {
  defaultValue: string;
  onTitleChange: (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: colors.cardLight,
        paddingBottom: spacing.small,
        paddingHorizontal: spacing.medium,
      }}
    >
      <TextInput
        onChange={onTitleChange}
        defaultValue={defaultValue}
        style={[textStyles.heading]}
        placeholder="Add a title to this entry."
      />
    </View>
  );
};

export default TitleSetter;
