import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import { ChevronDown, Filter, Search } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/search/FilterBottomSheet";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import JournalEntryCard from "@/components/core/JournalEntryCard";
import Loader from "@/components/core/Loader";
import { getSortNameByValue, sortOptions } from "@/constants/constants";
import { format, isSameDay, lightFormat } from "date-fns";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { fetchfilteredEntries } = useJournalEntriesStore();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const searchQueryRef = useRef<{
    inputValue: string;
  }>({
    inputValue: "",
  });
  const searchInputRef = useRef<TextInput>(null);

  const [filters, setFilters] = useState<any>({
    sort: null,
    dates: null,
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    const _filter: any = {
      sort: filters.sort,
      search: searchQueryRef.current.inputValue,
    };
    if (filters.dates) {
      _filter.dates = filters.dates;
    }
    const data = await fetchfilteredEntries(_filter);
    setJournalEntries(data);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(filters);
    if (filters.sort) {
      fetchData();
    }
  }, [filters]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    if (
      filters.sort ||
      filters.dates ||
      searchQueryRef.current.inputValue.length > 0
    ) {
      setRefreshing(true);
      await fetchData();
      setRefreshing(false);
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundLight,
        marginTop: StatusBar.currentHeight,
        gap: spacing.medium,
      }}
    >
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
              await fetchData();
              searchInputRef.current!.clear();
              searchQueryRef.current.inputValue = "";
            }}
            clearButtonMode="always"
            onChange={(
              event: NativeSyntheticEvent<TextInputChangeEventData>
            ) => {
              searchQueryRef.current.inputValue = event.nativeEvent.text;
            }}
            style={{ flex: 1 }}
            placeholder="Search through diary..."
          />
          <TouchableOpacity
            onPress={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
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
        </View>
      </View>

      <FlatList
        style={{
          paddingHorizontal: spacing.medium,
        }}
        data={journalEntries}
        renderItem={(entry) => <JournalEntryCard entry={entry.item} />}
        keyExtractor={(entry) => entry.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backgroundLight}
            style={{ elevation: 2 }}
          />
        }
      />

      <FilterBottomSheet
        setFilters={setFilters}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
        isFilterMenuOpen={isFilterMenuOpen}
      />

      {isLoading ? <Loader /> : ""}
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
