import { View, Text } from "react-native";
import React from "react";
import { spacing, textStyles } from "@/constants/theme";
import dayjs from "dayjs";

const DateTimeSetter = ({ entryDateTime }: { entryDateTime: Date }) => {
  return (
    <View style={{ flexDirection: "row", marginBottom: spacing.medium }}>
      <Text style={[textStyles.label, { fontFamily: "Roboto_500Medium" }]}>
        {dayjs(entryDateTime).format("dddd, hh:mm A")}
      </Text>
      <Text style={[textStyles.body]}>
        {dayjs(entryDateTime).format("  - D MMM YYYY")}
      </Text>
    </View>
  );
};

export default DateTimeSetter;
