import { colors, spacing, textStyles } from "@/constants/theme";
import { Tabs } from "expo-router";
import { House, CalendarDays, Settings, Search } from "lucide-react-native";
import { Text } from "react-native";

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { height: 60 },
          tabBarItemStyle: {
            justifyContent: "center",
            flex: 1,
            marginTop: spacing.small / 2,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  textStyles.smallText,
                  {
                    fontSize: 12,
                    marginBottom: spacing.small / 2,
                    color: focused ? colors.primary : colors.neutralLight,
                  },
                ]}
              >
                Home
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <House
                height={24}
                width={24}
                color={focused ? colors.primary : colors.neutralLight}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarStyle: { height: 60 },
          tabBarItemStyle: {
            justifyContent: "center",
            flex: 1,
            marginTop: spacing.small / 2,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  textStyles.smallText,
                  {
                    fontSize: 12,
                    marginBottom: spacing.small / 2,
                    color: focused ? colors.primary : colors.neutralLight,
                  },
                ]}
              >
                Search
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Search
                height={24}
                width={24}
                color={focused ? colors.primary : colors.neutralLight}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarStyle: { height: 60 },
          tabBarItemStyle: {
            justifyContent: "center",
            flex: 1,
            marginTop: spacing.small / 2,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  textStyles.smallText,
                  {
                    fontSize: 12,
                    marginBottom: spacing.small / 2,
                    color: focused ? colors.primary : colors.neutralLight,
                  },
                ]}
              >
                Calendar
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <CalendarDays
                height={24}
                width={24}
                color={focused ? colors.primary : colors.neutralLight}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarStyle: { height: 60 },
          tabBarItemStyle: {
            justifyContent: "center",
            flex: 1,
            marginTop: spacing.small / 2,
          },
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={[
                  textStyles.smallText,
                  {
                    fontSize: 12,
                    marginBottom: spacing.small / 2,
                    color: focused ? colors.primary : colors.neutralLight,
                  },
                ]}
              >
                Settings
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => {
            return (
              <Settings
                height={24}
                width={24}
                color={focused ? colors.primary : colors.neutralLight}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}

export default TabsLayout;
