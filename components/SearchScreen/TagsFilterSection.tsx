import { Text, TouchableOpacity, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import { ChevronDown } from "lucide-react-native";
import Animated, {
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useJournalEntriesStore from "@/state/useJournalEntriesStore";

const TagsFilterSection = ({
  currentFilterOpen,
  setCurrentFilterOpen,
  selectedTags,
  setSelectedTags,
}: {
  currentFilterOpen: string;
  setCurrentFilterOpen: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { tags } = useJournalEntriesStore();

  const headerChevron = useSharedValue<string>("0deg");

  const headerChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: headerChevron.value }],
  }));

  useLayoutEffect(() => {
    if (currentFilterOpen === "tags") {
      headerChevron.value = withTiming("-90deg", { duration: 250 });
    } else {
      headerChevron.value = withTiming("0deg", { duration: 250 });
    }
  }, [currentFilterOpen]);

  return (
    <View style={{ gap: spacing.medium }}>
      <TouchableOpacity
        onPress={() => {
          if (currentFilterOpen === "tags") {
            setCurrentFilterOpen("");
          } else {
            setCurrentFilterOpen("tags");
          }
        }}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={[textStyles.subheading]}>Tags</Text>
        <Animated.View style={[headerChevronStyle]}>
          <ChevronDown size={24} color={colors.textLight} />
        </Animated.View>
      </TouchableOpacity>
      {currentFilterOpen === "tags" ? (
        <Animated.View
          entering={FadeInUp.duration(150)}
          exiting={FadeOutUp.duration(150)}
          style={{ flexDirection: "row", gap: spacing.small, flexWrap: "wrap" }}
        >
          {tags.map((t) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTags((prevSelectedTags) => {
                    if (prevSelectedTags.includes(t.tag)) {
                      // If the tag is already selected, remove it
                      return prevSelectedTags.filter((sTag) => sTag !== t.tag);
                    } else {
                      // If the tag is not selected, add it
                      return [...prevSelectedTags, t.tag];
                    }
                  });
                }}
                style={{
                  backgroundColor: colors.cardLight,
                  paddingHorizontal: spacing.small,
                  paddingVertical: spacing.small / 2,
                  borderRadius: 4,
                  flexDirection: "row",
                  gap: spacing.small / 2,
                  borderWidth: 1,
                  borderColor: selectedTags.includes(t.tag)
                    ? colors.textLight
                    : colors.cardLight,
                }}
              >
                <Text
                  style={[
                    textStyles.smallText,
                    selectedTags.includes(t.tag)
                      ? {
                          fontFamily: "Roboto_500Medium",
                        }
                      : {},
                  ]}
                >
                  {t.tag}
                </Text>
                <Text
                  style={[
                    textStyles.smallText,
                    {
                      backgroundColor: colors.backgroundLight,
                      height: 20,
                      width: 20,
                      borderRadius: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                  ]}
                >
                  {t.count}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      ) : (
        ""
      )}
    </View>
  );
};

export default TagsFilterSection;
