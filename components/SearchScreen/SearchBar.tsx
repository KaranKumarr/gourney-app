import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { getSortNameByValue } from "@/constants/constants";
import { colors, spacing, textStyles } from "@/constants/theme";
import { format, isSameDay } from "date-fns";
import {
  ChevronDown,
  CircleX,
  Filter,
  Search,
  Tags,
} from "lucide-react-native";

type SearchBar = {
  searchQuery: React.MutableRefObject<{ inputValue: string }>;
  fetchEntries: () => Promise<void>;
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
  clearFilters: () => void;
};

const SearchBar = ({
  searchQuery,
  fetchEntries,
  setIsFilterMenuOpen,
  filters,
  clearFilters,
}: SearchBar) => {
  const [search, setSearch] = useState("");

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
          value={search}
          onSubmitEditing={async (event) => {
            if (search.length > 0) {
              searchQuery.current.inputValue = search;
              await fetchEntries();
              setSearch("");
            }
          }}
          onChangeText={(text) => {
            setSearch(text);
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
            position: "relative",
          }}
        >
          <Filter size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: spacing.small / 2,
          flexWrap: "wrap",
        }}
      >
        {searchQuery.current.inputValue.length > 0 && (
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
            <Text
              style={[textStyles.smallText]}
            >{`"${searchQuery.current.inputValue}"`}</Text>
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
        {filters.tags && filters.tags.length > 0 ? (
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
            <Tags color={colors.textLight} size={16} />
            {filters.tags.map((tag: string, index: number) => (
              <Text key={index} style={[textStyles.smallText]}>
                {tag}
                {filters.tags && index === filters.tags!.length - 1 ? "" : ","}
              </Text>
            ))}
          </View>
        ) : (
          ""
        )}
        {filters.sort ||
        filters.dates ||
        searchQuery.current.inputValue.length > 0 ||
        (filters.tags && filters.tags!.length > 0) ? (
          <TouchableOpacity
            onPress={clearFilters}
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
