import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { spacing, colors, textStyles } from "@/constants/theme";
import { SmilePlus, Tags } from "lucide-react-native";

const Toolbox = ({
  handleMoodTap,
  handleTagsTap,
}: {
  handleMoodTap: () => void;
  handleTagsTap: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: spacing.medium,
        gap: spacing.small,
        paddingHorizontal: spacing.medium,
      }}
    >
      <TouchableOpacity
        onPress={handleMoodTap}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small,
          padding: spacing.small,
          backgroundColor: colors.secondary,
          borderRadius: 4,
        }}
      >
        <SmilePlus height={20} width={20} color={colors.backgroundLight} />
        <Text
          style={[
            textStyles.smallText,
            {
              color: colors.backgroundLight,
              textTransform: "uppercase",
            },
          ]}
        >
          Set Mood
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleTagsTap}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small,
          padding: spacing.small,
          backgroundColor: colors.secondary,
          borderRadius: 4,
        }}
      >
        <Tags height={20} width={20} color={colors.backgroundLight} />
        <Text
          style={[
            textStyles.smallText,
            {
              color: colors.backgroundLight,
              textTransform: "uppercase",
            },
          ]}
        >
          Add Tags
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Toolbox;
