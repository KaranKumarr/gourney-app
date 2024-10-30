import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, spacing } from "@/constants/theme";
import { Filter, Search } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/search/FilterBottomSheet";
import useJournalEntriesStore, {
  JournalEntry,
} from "@/state/useJournalEntriesStore";
import JournalEntryCard from "@/components/core/JournalEntryCard";

const SearchScreen = () => {
  const { fetchfilteredEntries } = useJournalEntriesStore();

  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [filters, setFilters] = useState<any>({
    sort: null,
    dates: null,
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchfilteredEntries({ sort: filters.sort });
      setJournalEntries(data);
    };
    if (filters.sort) {
      fetchData();
    }
  }, [filters]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const data = await fetchfilteredEntries({ sort: filters.sort });
    setJournalEntries(data);
    setRefreshing(false);
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
        <TextInput style={{ flex: 1 }} placeholder="Search through diary..." />
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
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
