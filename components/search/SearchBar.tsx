import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { getSortNameByValue } from "@/constants/constants";
import { spacing, colors, textStyles } from "@/constants/theme";
import { format, isSameDay } from "date-fns";
import { Search, Filter, ChevronDown, CircleX } from "lucide-react-native";
const searchInputRef = useRef<TextInput>(null);

const SearchBar = ({
  searchQueryRef,
  fetchEntries,
  setIsFilterMenuOpen,
  filters,
}: {
  searchQueryRef: React.MutableRefObject<{
    inputValue: string;
  }>;
  fetchEntries: () => Promise<void>;
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
}) => {
  return (
    <View
      style={{
        padding: spacing.medium,
        backgroundColor: colors.cardLight,
      }}
    >
      {/* Search */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.backgroundLight,
          paddingHorizontal: spacing.small,
          paddingVertical: spacing.small / 2,
          borderRadius: 4,
          elevation: 1,
          gap: spacing.small,
        }}
      >
        <Search size={24} color={colors.textLight} />
        <TextInput
          ref={searchInputRef}
          onSubmitEditing={async () => {
            if (
              searchQueryRef.current.inputValue.length > 0 &&
              searchInputRef.current
            ) {
              await fetchEntries();
              searchInputRef.current.clear();
              searchQueryRef.current.inputValue = "";
            }
          }}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            searchQueryRef.current.inputValue = event.nativeEvent.text;
          }}
          style={{ flex: 1 }}
          placeholder="Search through diary..."
        />
        <TouchableOpacity
          onPress={() => {
            setIsFilterMenuOpen(true);
          }}
          style={{
            padding: spacing.small,
            borderRadius: 100,
            position: "relative",
          }}
        >
          <Filter size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.small / 2 }}>
        {searchQueryRef.current.inputValue.length > 0 && (
          <View
            style={{
              backgroundColor: colors.backgroundLight,
              marginTop: spacing.small,
              paddingVertical: spacing.small / 2,
              paddingHorizontal: spacing.small,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.small / 2,
            }}
          >
            <Text style={[textStyles.smallText]}>
              {`"${searchQueryRef.current.inputValue}"`}
            </Text>
          </View>
        )}
        {filters.sort && (
          <View
            style={{
              backgroundColor: colors.backgroundLight,
              marginTop: spacing.small,
              paddingVertical: spacing.small / 2,
              paddingHorizontal: spacing.small,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.small / 2,
            }}
          >
            <Text style={[textStyles.smallText, {}]}>
              {getSortNameByValue(filters.sort.replace("-", ""))}
            </Text>
            <View
              style={{
                transform: filters.sort.includes("-")
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            >
              <ChevronDown color={colors.textLight} width={16} />
            </View>
          </View>
        )}
        {filters.dates && (
          <View
            style={{
              backgroundColor: colors.backgroundLight,
              marginTop: spacing.small,
              paddingVertical: spacing.small / 2,
              paddingHorizontal: spacing.small,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.small / 2,
            }}
          >
            <Text style={[textStyles.smallText]}>
              {format(filters.dates.startDate, "d MMM yyyy")}
              {isSameDay(filters.dates.startDate, filters.dates.endDate)
                ? ""
                : "  -  " + format(filters.dates.endDate, "d MMM yyyy")}
            </Text>
          </View>
        )}
        {filters.sort ||
        filters.dates ||
        searchQueryRef.current.inputValue.length > 0 ? (
          <TouchableOpacity
            style={{
              marginTop: spacing.small,
              padding: spacing.small / 2,
              paddingLeft: spacing.small,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircleX color={colors.error} size={20} />
          </TouchableOpacity>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default SearchBar;
