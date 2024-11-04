import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";
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
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
    console.log("fetchData", filters);
    const _filter: any = {
      sort: filters.sort,
      search: searchQueryRef.current.inputValue,
      tags: JSON.stringify(filters.tags),
      page: 1,
    };
    if (filters.dates) {
      _filter.dates = filters.dates;
    }
    try {
      const res = await apiPath.get("journal", _filter);
      setJournalEntries(res.data.entries);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

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

  const loadMoreData = async () => {
    if (currentPage < totalPages && !isFetchingMore) {
      setIsFetchingMore(true);
      const nextPage = Number(currentPage) + 1;
      const _filter: any = {
        sort: filters.sort,
        search: searchQueryRef.current.inputValue,
        tags: JSON.stringify(filters.tags),
        page: nextPage,
      };
      if (filters.dates) {
        _filter.dates = filters.dates;
      }

      try {
        const res = await apiPath.get("journal", _filter);
        setJournalEntries((prevResults) => [
          ...prevResults,
          ...res.data.entries,
        ]);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } catch (error) {
        console.error("Load More Results Error:", error);
      } finally {
        setIsFetchingMore(false);
      }
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
        onEndReached={loadMoreData}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator
              style={{ marginVertical: spacing.small }}
              size="large"
              color={colors.primary}
            />
          ) : null
        }
      />
      <FilterBottomSheet
        fetchEntries={fetchData}
        setFilters={setFilters}
        setIsFilterMenuOpen={setIsFilterMenuOpen}
        isFilterMenuOpen={isFilterMenuOpen}
      />
      {isLoading ? <Loader /> : ""}
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
