import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SpaceProvider, SpaceContext } from "@/context/SpaceContext";
import { LightTheme, DarkTheme } from "@/hooks/colors";
import { useContext } from "react";

function TabsContent() {
  const { darkMode } = useContext(SpaceContext);
  const theme = darkMode ? DarkTheme : LightTheme;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="planet" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mission"
        options={{
          title: "Mission",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analysis"
        options={{
          title: "Analysis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <SpaceProvider>
      <TabsContent />
    </SpaceProvider>
  );
}
