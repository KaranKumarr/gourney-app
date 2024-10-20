import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { colors, spacing, textStyles } from "@/constants/theme";
import TopBar from "@/components/core/TopBar";
import useJournalEntriesStore from "@/state/useJournalEntriesStore";
import HappyEmoji from "@/assets/emoji-happy.svg";
import SadEmoji from "@/assets/emoji-sad.svg";
import StressedEmoji from "@/assets/emoji-stressed.svg";
import CalmEmoji from "@/assets/emoji-calm.svg";
import AngryEmoji from "@/assets/emoji-angry.svg";
import dayjs from "dayjs";
import { Plus } from "lucide-react-native";
import useUserStore from "@/state/useUserStore";
import { router } from "expo-router";
import JournalEntryCard from "@/components/core/JournalEntryCard";

const Home = () => {
  const { journalEntries, fetchEntries } = useJournalEntriesStore();
  const { user } = useUserStore();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            progressBackgroundColor={colors.backgroundLight}
            style={{ elevation: 2 }}
          />
        }
        nestedScrollEnabled
        style={{ flex: 1, backgroundColor: colors.backgroundLight }}
      >
        <TopBar />
        <View
          style={{
            paddingHorizontal: spacing.medium,
            gap: spacing.medium,
          }}
        >
          <View>
            <Text
              style={[textStyles.heading, { fontFamily: "Roboto_400Regular" }]}
            >
              Good Morning!
            </Text>
            <Text style={[textStyles.heading]}>{user.name}</Text>
          </View>
          <View
            style={{
              backgroundColor: colors.cardLight,
              padding: spacing.medium,
              paddingBottom: spacing.small,
              borderRadius: 4,
              gap: spacing.small,
              alignItems: "center",
            }}
          >
            <Text style={[textStyles.subheading]}>
              How are you feeling today?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={{ padding: spacing.small }}>
                <HappyEmoji height={24} width={24} />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: spacing.small }}>
                <CalmEmoji height={24} width={24} />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: spacing.small }}>
                <SadEmoji height={24} width={24} />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: spacing.small }}>
                <StressedEmoji height={24} width={24} />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: spacing.small }}>
                <AngryEmoji height={24} width={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[textStyles.subheading]}>Recent Entries</Text>

            <TouchableOpacity>
              <Text style={[textStyles.body, { color: colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            nestedScrollEnabled={true}
            scrollEnabled={false}
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
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          router.push("/journal/create");
        }}
        style={{
          position: "absolute",
          bottom: spacing.large,
          right: 0,
          backgroundColor: colors.primary,
          zIndex: 10,
          marginHorizontal: spacing.medium,
          padding: spacing.small,
          borderRadius: 1000,
          elevation: 2,
        }}
      >
        <Plus color={colors.backgroundLight} height={24} width={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
