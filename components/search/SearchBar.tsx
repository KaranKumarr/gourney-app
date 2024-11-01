import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { getSortNameByValue } from "@/constants/constants";
import { spacing, colors, textStyles } from "@/constants/theme";
import { format, isSameDay } from "date-fns";
import { Search, Filter, ChevronDown, CircleX } from "lucide-react-native";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  fetchEntries,
  setIsFilterMenuOpen,
  filters,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchEntries: () => Promise<void>;
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: any;
}) => {
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
          onSubmitEditing={async () => {
            if (search.length > 0) {
              await fetchEntries();
              setSearch("");
              setSearchQuery(search);
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
      <View style={{ flexDirection: "row", gap: spacing.small / 2 }}>
        {searchQuery.length > 0 && (
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
            <Text style={[textStyles.smallText]}>{`"${searchQuery}"`}</Text>
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
        {filters.sort || filters.dates || searchQuery.length > 0 ? (
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
