import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import { ChevronLeft, SmilePlus, Tags, Check } from "lucide-react-native";
import { colors, defaultStyling, spacing, textStyles } from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import dayjs from "dayjs";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import Header from "@/components/JournalScreen/Header";
import DateTimeSetter from "@/components/JournalScreen/DateTimeSetter";
import Toolbox from "@/components/JournalScreen/Toolbox";
import TitleSetter from "@/components/JournalScreen/TitleSetter";
import BodySetter from "@/components/JournalScreen/BodySetter";

const Journal = () => {
  const { id } = useLocalSearchParams();
  const { fetchEntryById, updateEntry } = useJournalEntriesStore();

  const [entry, setEntry] = useState<JournalEntry | null>(null);

  const titleRef = useRef<{
    inputValue: string;
  }>({
    inputValue: "",
  });

  const bodyRef = useRef<{
    inputValue: string;
  }>({
    inputValue: entry?.body ?? "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp: JournalEntry = await fetchEntryById(+id);
        setEntry(temp);
        titleRef.current.inputValue = temp?.title ?? "";
        bodyRef.current.inputValue = temp?.body ?? "";
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: entry?.body ?? "",
  });

  const onTitleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    titleRef.current.inputValue = event.nativeEvent.text;
  };

  const submit = async () => {
    if (entry) {
      const title = titleRef.current.inputValue;
      const body = await editor.getHTML();

      await updateEntry(entry.id, {
        ...entry,
        title,
        body,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backgroundLight,
        flex: 1,
        paddingVertical: spacing.small,
      }}
    >
      <Header submit={submit} />

      {entry?.entryDateTime ? (
        <DateTimeSetter entryDateTime={entry.entryDateTime} />
      ) : (
        ""
      )}

      <Toolbox />

      <TitleSetter
        onTitleChange={onTitleChange}
        defaultValue={entry?.title ?? ""}
      />

      <BodySetter editor={editor} />
    </SafeAreaView>
  );
};

export default Journal;
