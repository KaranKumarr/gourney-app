import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StatusBar,
} from "react-native";
import React, { useRef } from "react";
import useJournalEntriesStore, {
  NewJournalEntry,
} from "@/state/useJournalEntriesStore";
import { colors, spacing } from "@/constants/theme";
import { useEditorBridge } from "@10play/tentap-editor";
import Header from "@/components/JournalScreen/Header";
import DateTimeSetter from "@/components/JournalScreen/DateTimeSetter";
import Toolbox from "@/components/JournalScreen/Toolbox";
import TitleSetter from "@/components/JournalScreen/TitleSetter";
import BodySetter from "@/components/JournalScreen/BodySetter";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import dayjs from "dayjs";
import { showMessage } from "react-native-flash-message";
import useUserStore from "@/state/useUserStore";
import { router } from "expo-router";

const CreateJournalEntry = () => {
  const { addEntry } = useJournalEntriesStore();
  const { user } = useUserStore();

  const titleRef = useRef<{
    inputValue: string;
  }>({
    inputValue: "",
  });

  const editor = useEditorBridge({
    avoidIosKeyboard: true,
    initialContent: "",
  });

  const onTitleChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    titleRef.current.inputValue = event.nativeEvent.text;
  };

  const submit = async () => {
    const title = titleRef.current.inputValue;
    const body = await editor.getHTML();
    console.log(title, body);
    if (title.length === 0) {
      showMessage({
        message: "Missing title.",
        description: "Cannot create an entry without title.",
        type: "danger",
      });
      return;
    }
    const bodyText = await editor.getText();
    if (bodyText.length === 0) {
      showMessage({
        message: "Missing body.",
        description: "Cannot create an entry without body.",
        type: "danger",
      });
      return;
    }

    console.log(user);

    const newEntry: NewJournalEntry = {
      userId: user.id,
      title,
      body,
      entryDateTime: dayjs().toDate(),
    };

    showMessage({
      message: "Created.",
      description: "New journal entry added to your diary.",
      type: "success",
    });
    router.back();
  };

  return (
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
      <Header buttonText={"Create"} submit={submit} />

      <DateTimeSetter entryDateTime={dayjs().toDate()} />

      <Toolbox />

      <TitleSetter onTitleChange={onTitleChange} defaultValue={""} />

      <BodySetter editor={editor} />
    </Animated.View>
  );
};

export default CreateJournalEntry;
