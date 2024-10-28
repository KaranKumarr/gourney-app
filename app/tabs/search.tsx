import {
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors, spacing } from "@/constants/theme";
import { Search } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FilterBottomSheet from "@/components/search/FilterBottomSheet";

const SearchScreen = () => {
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);

  const [sortValue, setSortValue] = useState("create");

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colors.backgroundLight,
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium,
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
      </View>

      <View style={{ flexDirection: "row", paddingVertical: spacing.medium }}>
        <TouchableOpacity
          onPress={() => setFilterMenuOpen(!isFilterMenuOpen)}
          style={{
            backgroundColor: colors.cardLight,
            paddingVertical: spacing.small,
            paddingHorizontal: spacing.medium,
            borderRadius: 4,
            position: "relative",
            borderWidth: 1,
            borderColor: colors.neutralLight,
          }}
        >
          <Text>Sort By</Text>
        </TouchableOpacity>
      </View>

      <FilterBottomSheet
        setFilterMenuOpen={setFilterMenuOpen}
        isFilterMenuOpen={isFilterMenuOpen}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
