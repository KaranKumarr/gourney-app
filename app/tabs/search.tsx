import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import { ChevronUp, Search } from "lucide-react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import Animated, {
  FadeIn,
  FadeOutDown,
  RotateInDownRight,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

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

const SearchScreen = () => {
  const [isSortMenu, setIsSortMenu] = useState(false);

  const [sortValue, setSortValue] = useState("create");
  const rotate = useSharedValue<string>("0deg");

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }));

  useEffect(() => {
    if (isSortMenu) {
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
  }, [isSortMenu]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundLight,
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium,
      }}
    >
      {/* Search */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.cardLight,
          paddingHorizontal: spacing.small,
          paddingVertical: spacing.small / 2,
          borderRadius: 4,
          elevation: 1,
          gap: spacing.small,
        }}
      >
        <Search size={24} color={colors.textLight} />
        <TextInput style={{ flex: 1 }} placeholder="Search through diary..." />
      </View>

      <View style={{ flexDirection: "row", paddingVertical: spacing.medium }}>
        <TouchableOpacity
          onPress={() => setIsSortMenu(!isSortMenu)}
          style={{
            backgroundColor: colors.cardLight,
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.medium,
            borderRadius: 4,
            position: "relative",
            borderWidth: 1,
            borderColor: colors.neutralLight,
          }}
        >
          <Text>Sort By</Text>
        </TouchableOpacity>
      </View>

      {isSortMenu ? (
        <TouchableWithoutFeedback
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          onPress={() => {
            setIsSortMenu(false);
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
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
