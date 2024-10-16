import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
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

const Home = () => {
  const { journalEntries } = useJournalEntriesStore();
  const { user } = useUserStore();

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundLight }}>
      <ScrollView
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
            renderItem={(entry) => {
              return (
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: colors.neutralLight,
                    padding: spacing.medium,
                    borderRadius: 4,
                    gap: spacing.small / 2,
                    marginBottom: spacing.medium,
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        textStyles.smallText,
                        { fontFamily: "Roboto_500Medium" },
                      ]}
                    >
                      {dayjs(entry.item.entryDateTime).format("hh:mm A")}
                    </Text>
                    <Text style={[textStyles.smallText]}>
                      {dayjs(entry.item.entryDateTime).format("  - D MMM YYYY")}
                    </Text>
                  </View>

                  <Text style={[textStyles.label]}>{entry.item.title}</Text>
                  <Text
                    style={[textStyles.body, { color: colors.neutralLight }]}
                    numberOfLines={3}
                  >
                    {entry.item.body.trim()}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(entry) => entry.id.toString()}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
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
