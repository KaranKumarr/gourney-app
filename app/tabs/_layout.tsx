import { Tabs } from "expo-router";

function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="statistics" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}

export default TabsLayout;
