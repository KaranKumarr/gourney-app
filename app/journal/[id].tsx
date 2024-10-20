import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StatusBar,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import { colors, defaultStyling, spacing, textStyles } from "@/constants/theme";
import { useEditorBridge } from "@10play/tentap-editor";
import Header from "@/components/JournalScreen/Header";
import DateTimeSetter from "@/components/JournalScreen/DateTimeSetter";
import Toolbox from "@/components/JournalScreen/Toolbox";
import TitleSetter from "@/components/JournalScreen/TitleSetter";
import BodySetter from "@/components/JournalScreen/BodySetter";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Tag } from "lucide-react-native";

const Journal = () => {
  const { id } = useLocalSearchParams();
  const { fetchEntryById, updateEntry } = useJournalEntriesStore();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [openMoodSheet, setOpenMoodSheet] = useState(false);

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

  const tagInputRef = useRef<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp: JournalEntry = await fetchEntryById(+id);
        setEntry(temp);
        titleRef.current.inputValue = temp?.title ?? "";
        bodyRef.current.inputValue = temp?.body ?? "";
        setTags(temp?.tags ?? []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!openMoodSheet) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [openMoodSheet]);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View
        entering={FadeInRight.duration(150).delay(150)}
        exiting={FadeOutRight.duration(150)}
        style={{
          flex: 1,
          paddingVertical: spacing.small,
          backgroundColor: colors.backgroundLight,
          marginTop: StatusBar.currentHeight,
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
        />

        <TitleSetter
          onTitleChange={onTitleChange}
          defaultValue={entry?.title ?? ""}
        />

        <BodySetter editor={editor} />
      </Animated.View>

      {openMoodSheet ? (
        <TouchableWithoutFeedback
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onPress={() => {
            setOpenMoodSheet(false);
          }}
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOutDown}
            style={{
              marginTop: StatusBar.currentHeight,
              flex: 1,
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width,
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          ></Animated.View>
        </TouchableWithoutFeedback>
      ) : null}

      <BottomSheet
        index={-1}
        snapPoints={[20]}
        ref={bottomSheetRef}
        enableDynamicSizing={true}
        onChange={() => {}}
      >
        <BottomSheetView
          style={{
            flex: 0,
            minHeight: 120,
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.small,
            gap: spacing.medium,
          }}
        >
          <Text style={[textStyles.label, { fontSize: 18 }]}>
            Add tags for your story.
          </Text>
          <TextInput
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={(e) => {
              setTags([...tags, e.nativeEvent.text]);
              tagInputRef.current?.clear();
            }}
            placeholder="Write a new tag..."
            style={[
              defaultStyling.defaultInput,
              { backgroundColor: colors.cardLight },
            ]}
            ref={tagInputRef}
          />
          <View>
            {tags.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: spacing.small / 2,
                }}
              >
                {tags.map((tag, index) => {
                  return (
                    <Animated.View
                      entering={FadeInLeft.duration(300)}
                      key={index}
                      style={{
                        backgroundColor: colors.cardLight,
                        paddingHorizontal: spacing.small,
                        paddingVertical: spacing.small / 2,
                        borderRadius: 4,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: spacing.small / 2,
                        marginRight: spacing.small,
                      }}
                    >
                      <Tag height={14} width={14} color={colors.textLight} />
                      <Text style={[textStyles.smallText]}>{tag}</Text>
                    </Animated.View>
                  );
                })}
              </View>
            ) : (
              <Text style={[textStyles.body, { color: colors.neutralLight }]}>
                Tags list is empty right now...
              </Text>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Journal;
