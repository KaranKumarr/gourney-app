import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { spacing, textStyles, defaultStyling, colors } from "@/constants/theme";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Tag } from "lucide-react-native";
import Animated, {
  FadeIn,
  FadeOutDown,
  FadeInLeft,
} from "react-native-reanimated";

const TagsBottomSheet = ({
  tagInputRef,
  tags,
  setTags,
  openTagsSheet,
  setOpenTagsSheet,
}: {
  tagInputRef: React.MutableRefObject<any>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  openTagsSheet: boolean;
  setOpenTagsSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (!openTagsSheet) {
      bottomSheetRef.current?.close();
    } else {
      bottomSheetRef.current?.snapToIndex(1);
    }
  }, [openTagsSheet]);

  return (
    <>
      {openTagsSheet ? (
        <TouchableWithoutFeedback
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onPress={() => {
            setOpenTagsSheet(false);
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
    </>
  );
};

export default TagsBottomSheet;
