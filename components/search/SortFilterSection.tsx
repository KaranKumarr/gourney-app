import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { spacing, textStyles, colors } from "@/constants/theme";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import Animated, {
  withTiming,
  RotateInDownRight,
  useAnimatedStyle,
  useSharedValue,
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

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

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
        <ChevronDown size={24} color={colors.textLight} />
      </TouchableOpacity>
      {currentFilterOpen === "sort" ? (
        <Animated.View style={{ flexDirection: "row", gap: spacing.small }}>
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
                    <Animated.View style={[style]}>
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
