import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import { ChevronLeft, SmilePlus, Tags, X } from "lucide-react-native";
import { colors, spacing, textStyles } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

const Journal = () => {
  const { id } = useLocalSearchParams();
  const { fetchEntryById } = useJournalEntriesStore();

  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const temp = await fetchEntryById(+id);
      setEntry(temp);
    };
    fetchData();
  }, [id]);

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: entry?.body ?? "",
    editable: true,
  });
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backgroundLight,
        flex: 1,
        paddingVertical: spacing.small,
        paddingHorizontal: spacing.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: spacing.small,
        }}
      >
        <TouchableOpacity>
          <ChevronLeft height={28} width={28} color={colors.neutralLight} />
        </TouchableOpacity>
        <TouchableOpacity>
          <X height={28} width={28} color={colors.neutralLight} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", marginBottom: spacing.medium }}>
        <Text style={[textStyles.label, { fontFamily: "Roboto_500Medium" }]}>
          {dayjs(entry?.entryDateTime).format("dddd, hh:mm A")}
        </Text>
        <Text style={[textStyles.body]}>
          {dayjs(entry?.entryDateTime).format("  - D MMM YYYY")}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginBottom: spacing.medium,
          gap: spacing.small,
        }}
      >
        <TouchableOpacity
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

      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors.cardLight,
          paddingBottom: spacing.small,
        }}
      >
        <TextInput
          defaultValue={entry?.title}
          style={[textStyles.heading]}
          placeholder="Add a title to this entry."
        />
      </View>

      <View style={{ flex: 1, position: "relative" }}>
        <RichText editor={editor} />
        <KeyboardAvoidingView
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
          }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Journal;
