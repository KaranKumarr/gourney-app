import { StatusBar, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, spacing } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/search/FilterBottomSheet";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import JournalEntryCard from "@/components/core/JournalEntryCard";
import Loader from "@/components/core/Loader";
import SearchBar from "@/components/search/SearchBar";

const SearchScreen = () => {
    const searchQueryRef = useRef<{
      inputValue: string;
    }>({
      inputValue: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const { fetchfilteredEntries } = useJournalEntriesStore();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

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
    if (filters.sort || filters.dates) {
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
      <SearchBar
        searchQueryRef={searchQueryRef}
        fetchEntries={fetchData}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
        filters={filters}
      />

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
