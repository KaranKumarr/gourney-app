import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import Animated, {
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { spacing, textStyles, colors } from "@/constants/theme";
import { ChevronDown } from "lucide-react-native";
import CalendarPicker from "react-native-calendar-picker";

const DatesFilterSection = ({
  currentFilterOpen,
  setCurrentFilterOpen,
  dateValue,
  setDateValue,
}: {
  currentFilterOpen: string;
  dateValue: any;
  setCurrentFilterOpen: React.Dispatch<React.SetStateAction<string>>;
  setDateValue: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const headerChevron = useSharedValue<string>("0deg");

  const headerChevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: headerChevron.value }],
  }));

  useLayoutEffect(() => {
    if (currentFilterOpen === "date") {
      headerChevron.value = withTiming("-90deg", { duration: 250 });
    } else {
      headerChevron.value = withTiming("0deg", { duration: 250 });
    }
  }, [currentFilterOpen]);

  return (
    <View style={{ gap: spacing.medium }}>
      <TouchableOpacity
        onPress={() => {
          if (currentFilterOpen === "date") {
            setCurrentFilterOpen("");
          } else {
            setCurrentFilterOpen("date");
          }
        }}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={[textStyles.subheading]}>Filter By Dates</Text>
        <Animated.View style={[headerChevronStyle]}>
          <ChevronDown size={24} color={colors.textLight} />
        </Animated.View>
      </TouchableOpacity>
      {currentFilterOpen === "date" ? (
        <Animated.View
          entering={FadeInUp.duration(150)}
          exiting={FadeOutUp.duration(150)}
        >
          <CalendarPicker
            textStyle={{ color: colors.textLight }}
            previousTitleStyle={[textStyles.label, { color: colors.secondary }]}
            nextTitleStyle={[textStyles.label, { color: colors.secondary }]}
            startFromMonday={true}
            allowRangeSelection={true}
            allowBackwardRangeSelect={true}
            maxDate={Date()}
            selectedDayColor={colors.primary}
            selectedDayTextColor={colors.backgroundLight}
            onDateChange={(date, date2) => {
              if (date2 === "START_DATE") {
                setDateValue({
                  startDate: date,
                  endDate: dateValue.endDate,
                });
              } else {
                setDateValue({
                  startDate: dateValue.startDate,
                  endDate: date,
                });
              }
            }}
          />
        </Animated.View>
      ) : (
        ""
      )}
    </View>
  );
};

export default DatesFilterSection;
