import { FlatList, RefreshControl, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { colors, spacing } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/SearchScreen/FilterBottomSheet";
import { JournalEntry } from "@/state/useJournalEntriesStore";
import JournalEntryCard from "@/components/core/JournalEntryCard";
import Loader from "@/components/core/Loader";
import SearchBar from "@/components/SearchScreen/SearchBar";
import { ApiClient } from "@/constants/api";
const apiPath = ApiClient();

const SearchScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const searchQueryRef = useRef<{
    inputValue: string;
  }>({
    inputValue: "",
  });
  const [filters, setFilters] = useState<any>({
    sort: null,
    dates: null,
    tags: [],
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    setCurrentPage(1); // Reset current page for a new search
    const _filter: any = {
      sort: filters.sort,
      search: searchQueryRef.current.inputValue,
      tags: filters.tags,
    };
    if (filters.dates) {
      _filter.dates = filters.dates;
    }
    const searchResponse = await apiPath.get("journal", _filter);
    setJournalEntries(searchResponse.data.entries);
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

  const clearFilters = () => {
    setIsLoading(true);
    setTimeout(() => {
      setFilters({
        sort: null,
        dates: null,
      });
      searchQueryRef.current.inputValue = "";
      setJournalEntries([]);
      setIsLoading(false);
    }, 300);
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
        clearFilters={clearFilters}
        searchQuery={searchQueryRef}
        fetchEntries={fetchData}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
        filters={filters}
      />

      <FlatList
        style={{
          paddingHorizontal: spacing.medium,
        }}
        data={journalEntries}
        renderItem={(entry) => (
          <JournalEntryCard showTags={true} entry={entry.item} />
        )}
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
