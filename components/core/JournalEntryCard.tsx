import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import dayjs from "dayjs";
import { router } from "expo-router";
import { JournalEntry } from "@/state/useJournalEntriesStore";

const JournalEntryCard = ({ entry }: { entry: JournalEntry }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`journal/${entry.id}`);
      }}
      style={{
        borderWidth: 0.5,
        borderColor: colors.neutralLight,
        padding: spacing.medium,
        borderRadius: 4,
        gap: spacing.small / 2,
        marginBottom: spacing.medium,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[textStyles.smallText, { fontFamily: "Roboto_500Medium" }]}
        >
          {dayjs(entry.entryDateTime).format("hh:mm A")}
        </Text>
        <Text style={[textStyles.smallText]}>
          {dayjs(entry.entryDateTime).format("  - D MMM YYYY")}
        </Text>
      </View>

      <Text style={[textStyles.label]}>{entry.title}</Text>
      <Text
        style={[textStyles.body, { color: colors.neutralLight }]}
        numberOfLines={3}
      >
        {entry.body.trim()}
      </Text>
    </TouchableOpacity>
  );
};

export default JournalEntryCard;
