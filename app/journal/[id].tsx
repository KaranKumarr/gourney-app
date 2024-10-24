import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import { colors, spacing } from "@/constants/theme";
import { useEditorBridge } from "@10play/tentap-editor";
import Header from "@/components/JournalScreen/Header";
import DateTimeSetter from "@/components/JournalScreen/DateTimeSetter";
import Toolbox from "@/components/JournalScreen/Toolbox";
import TitleSetter from "@/components/JournalScreen/TitleSetter";
import BodySetter from "@/components/JournalScreen/BodySetter";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import TagsBottomSheet from "@/components/JournalScreen/TagsBottomSheet";

const Journal = () => {
  const { id } = useLocalSearchParams();
  const { fetchEntryById, updateEntry } = useJournalEntriesStore();

  const [openMoodSheet, setOpenMoodSheet] = useState(false);
  const [openTagsSheet, setOpenTagsSheet] = useState(false);

  const [entry, setEntry] = useState<JournalEntry | null>(null);

  const [tags, setTags] = useState<string[]>([]);

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

  const editor = useEditorBridge({
    initialContent: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp: JournalEntry = await fetchEntryById(+id);
        setEntry(temp);
        titleRef.current.inputValue = temp?.title ?? "";
        bodyRef.current.inputValue = temp?.body ?? "";
        setTags(temp?.tags ?? []);
        if (editor) editor.setContent(temp.body ?? "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

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
        tags,
      });
    }
  };

  return (
    <GestureHandlerRootView>
      <Animated.View
        entering={FadeInRight.duration(150).delay(150)}
        exiting={FadeOutRight.duration(150)}
        style={{
          flex: 1,
          paddingVertical: spacing.small,
          backgroundColor: colors.backgroundLight,
          marginTop: StatusBar.currentHeight,
          position: "relative",
        }}
      >
        <Header submit={submit} />

        {entry?.entryDateTime ? (
          <DateTimeSetter entryDateTime={entry.entryDateTime} />
        ) : (
          ""
        )}

        <Toolbox
          handleMoodTap={() => {
            setOpenMoodSheet(true);
          }}
          handleTagsTap={() => {
            setOpenTagsSheet(true);
          }}
        />

        <TitleSetter
          onTitleChange={onTitleChange}
          defaultValue={entry?.title ?? ""}
        />

        <BodySetter editor={editor} />
      </Animated.View>

      <TagsBottomSheet
        setOpenTagsSheet={setOpenTagsSheet}
        openTagsSheet={openTagsSheet}
        setTags={setTags}
        tags={tags}
      />

    </GestureHandlerRootView>
  );
};

export default Journal;
