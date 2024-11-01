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
import { colors, spacing } from "@/constants/theme";
import { Filter, Search } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/search/FilterBottomSheet";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import JournalEntryCard from "@/components/core/JournalEntryCard";
import Loader from "@/components/core/Loader";

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { fetchfilteredEntries } = useJournalEntriesStore();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const searchQueryRef = useRef<{
    inputValue: string;
  }>({
    inputValue: "",
  });

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
        paddingHorizontal: spacing.medium,
        paddingTop: spacing.medium,
        gap: spacing.medium,
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
        <TextInput
          onSubmitEditing={async () => {
            await fetchData();
          }}
          onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) => {
            searchQueryRef.current.inputValue = event.nativeEvent.text;
          }}
          style={{ flex: 1 }}
          placeholder="Search through diary..."
        />
        <TouchableOpacity
          onPress={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          style={{
            backgroundColor: colors.cardLight,
            padding: spacing.small,
            borderRadius: 100,
            position: "relative",
          }}
        >
          <Filter size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
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
