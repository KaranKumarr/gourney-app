import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { spacing, textStyles, colors } from "@/constants/theme";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import Animated, {
  withTiming,
  RotateInDownRight,
  useAnimatedStyle,
  useSharedValue,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { sortOptions } from "@/constants/constants";

const SortFilterSection = ({
  currentFilterOpen,
  setCurrentFilterOpen,
  sortValue,
  setSortValue,
}: {
  currentFilterOpen: string;
  sortValue: string;
  setCurrentFilterOpen: React.Dispatch<React.SetStateAction<string>>;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const rotate = useSharedValue<string>("0deg");

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

  const headerChevron = useSharedValue<string>("0deg");

  const headerChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: headerChevron.value }],
  }));

  useLayoutEffect(() => {
    if (currentFilterOpen === "sort") {
      headerChevron.value = withTiming("-90deg", { duration: 250 });
    } else {
      headerChevron.value = withTiming("0deg", { duration: 250 });
    }
  }, [currentFilterOpen]);

  return (
    <View style={{ gap: spacing.medium }}>
      <TouchableOpacity
        onPress={() => {
          if (currentFilterOpen === "sort") {
            setCurrentFilterOpen("");
          } else {
            setCurrentFilterOpen("sort");
          }
        }}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={[textStyles.subheading]}>Sort By</Text>
        <Animated.View style={[headerChevronStyle]}>
          <ChevronDown size={24} color={colors.textLight} />
        </Animated.View>
      </TouchableOpacity>
      {currentFilterOpen === "sort" ? (
        <Animated.View
          entering={FadeInUp.duration(150)}
          exiting={FadeOutUp.duration(150)}
          style={{ flexDirection: "row", gap: spacing.small }}
        >
          {sortOptions.map((sort) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (sort.value === sortValue) {
                    rotate.value = withTiming("180deg", {
                      duration: 250,
                    });
                    setSortValue("-" + sort.value);
                  } else {
                    rotate.value = withTiming("0deg", { duration: 250 });
                    setSortValue(sort.value);
                  }
                }}
                key={sort.value}
                style={{
                  backgroundColor: colors.cardLight,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: spacing.small / 2,
                  borderRadius: 4,
                  flexDirection: "row",
                  gap: spacing.small / 2,
                  borderWidth: 1,
                  borderColor: sortValue.includes(sort.value)
                    ? colors.textLight
                    : colors.cardLight,
                }}
              >
                <Text style={[textStyles.label, { fontSize: 12 }]}>
                  {sort.name}
                </Text>
                {sortValue.includes(sort.value) ? (
                  <Animated.View entering={RotateInDownRight}>
                    <Animated.View style={[rotateStyle]}>
                      <ChevronUp width={16} color={colors.textLight} />
                    </Animated.View>
                  </Animated.View>
                ) : (
                  ""
                )}
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

export default SortFilterSection;
