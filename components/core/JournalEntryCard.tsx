import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import dayjs from "dayjs";
import { router } from "expo-router";
import { JournalEntry } from "@/state/useJournalEntriesStore";
import { Tags } from "lucide-react-native";

const JournalEntryCard = ({
  entry,
  showTags,
}: {
  entry: JournalEntry;
  showTags?: boolean;
}) => {
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

      {showTags && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.small / 2,
            alignItems: "center",
          }}
        >
          {entry.tags.length > 0 && (
            <Tags
              style={{ marginRight: spacing.small / 2 }}
              size={18}
              color={colors.primary}
            />
          )}
          {entry.tags.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={{
                marginTop: spacing.small / 2,
                paddingHorizontal: spacing.small,
                paddingVertical: spacing.small / 3,
                borderRadius: 4,
                backgroundColor: colors.cardLight,
              }}
            >
              <Text style={[textStyles.smallText]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default JournalEntryCard;
