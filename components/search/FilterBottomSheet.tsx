import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  FadeIn,
  FadeOutDown,
  RotateInDownRight,
  withTiming,
} from "react-native-reanimated";
import { spacing, textStyles, colors } from "@/constants/theme";
import { ChevronUp } from "lucide-react-native";

const sortOptions = [
  {
    name: "Date Created",
    value: "create",
  },
  {
    name: "Title",
    value: "title",
  },
  {
    name: "Last Updated",
    value: "update",
  },
];

const FilterBottomSheet = ({
  sortValue,
  setSortValue,
  isFilterMenuOpen,
  setFilterMenuOpen,
}: {
  sortValue: string;
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  isFilterMenuOpen: boolean;
  setFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const rotate = useSharedValue<string>("0deg");

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

  useEffect(() => {
    if (isFilterMenuOpen) {
      navigation.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });
      setTimeout(() => {
        bottomSheetModalRef.current?.snapToIndex(1);
      }, 100);
    } else {
      bottomSheetModalRef.current?.close();
      setTimeout(() => {
        navigation.setOptions({
          tabBarStyle: {
            display: "flex",
            height: 60,
          },
        });
      }, 100);
    }
  }, [isFilterMenuOpen]);
  return (
    <>
      {isFilterMenuOpen ? (
        <TouchableWithoutFeedback
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onPress={() => {
            setFilterMenuOpen(false);
          }}
        >
          <Animated.View
            entering={FadeIn}
            exiting={FadeOutDown}
            style={{
              flex: 1,
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width,
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          />
        </TouchableWithoutFeedback>
      ) : null}

      <BottomSheet
        index={-1}
        snapPoints={[20]}
        ref={bottomSheetModalRef}
        enableDynamicSizing={true}
      >
        <BottomSheetView
          style={{
            flex: 0,
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.small,
            minHeight: 120,
          }}
        >
          <View style={{ gap: spacing.medium }}>
            <Text style={[textStyles.subheading]}>Sort By</Text>
            <View style={{ flexDirection: "row", gap: spacing.small }}>
              {sortOptions.map((sort) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (sort.value === sortValue) {
                        rotate.value = withTiming("180deg", { duration: 250 });
                        setSortValue("-" + sort.value);
                      } else {
                        rotate.value = withTiming("0deg", { duration: 250 });
                        setSortValue(sort.value);
                      }
                    }}
                    key={sort.value}
                    style={{
                      backgroundColor: colors.cardLight,
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: spacing.small / 2,
                      borderRadius: 4,
                      flexDirection: "row",
                      gap: spacing.small / 2,
                      borderWidth: 1,
                      borderColor: sortValue.includes(sort.value)
                        ? colors.textLight
                        : colors.cardLight,
                    }}
                  >
                    <Text style={[textStyles.label, { fontSize: 12 }]}>
                      {sort.name}
                    </Text>
                    {sortValue.includes(sort.value) ? (
                      <Animated.View entering={RotateInDownRight}>
                        <Animated.View style={[style]}>
                          <ChevronUp width={16} color={colors.textLight} />
                        </Animated.View>
                      </Animated.View>
                    ) : (
                      ""
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default FilterBottomSheet;
