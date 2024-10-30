import {
  Dimensions,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import Animated, { FadeIn, FadeOutDown } from "react-native-reanimated";
import { colors, defaultStyling, spacing, textStyles } from "@/constants/theme";
import SortFilterSection from "./SortFilterSection";
import DatesFilterSection from "./DatesFilterSection";

const FilterBottomSheet = ({
  isFilterMenuOpen,
  setIsFilterMenuOpen,
  setFilters,
}: {
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setFilters: React.Dispatch<React.SetStateAction<object>>;
}) => {
  const [dates, setDates] = useState<any>({
    startDate: null,
    endDate: null,
  });

  const [sortValue, setSortValue] = useState("entryDateTime");

  const [currentFilterOpen, setCurrentFilterOpen] = useState("sort");

  const bottomSheetModalRef = useRef<BottomSheet>(null);
  const navigation = useNavigation();

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
            setIsFilterMenuOpen(false);
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
            gap: spacing.medium,
          }}
        >
          <SortFilterSection
            sortValue={sortValue}
            setSortValue={setSortValue}
            currentFilterOpen={currentFilterOpen}
            setCurrentFilterOpen={setCurrentFilterOpen}
          />

          <DatesFilterSection
            dateValue={dates}
            setDateValue={setDates}
            currentFilterOpen={currentFilterOpen}
            setCurrentFilterOpen={setCurrentFilterOpen}
          />

          <TouchableOpacity
            onPress={() => {
              setFilters({
                sort: sortValue,
                dates: dates.startDate && dates.endDate ? dates : null,
              });

              setIsFilterMenuOpen(false);
            }}
            style={[
              defaultStyling.primaryButton,
              { paddingVertical: spacing.small, marginTop: spacing.small },
            ]}
          >
            <Text
              style={[
                defaultStyling.primaryButtonText,
                textStyles.label,
                { textTransform: "uppercase", color: colors.backgroundLight },
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default FilterBottomSheet;
