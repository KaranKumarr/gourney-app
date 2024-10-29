import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
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
        <ChevronDown size={24} color={colors.textLight} />
      </TouchableOpacity>
      {currentFilterOpen === "date" ? (
        <Animated.View>
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
