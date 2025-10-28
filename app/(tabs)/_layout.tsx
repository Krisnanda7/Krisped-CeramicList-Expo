import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8B4513",
        tabBarInactiveTintColor: "#BCAAA4",
        tabBarStyle: {
          backgroundColor: "#F5F3F1",
          borderTopWidth: 0.5,
          borderTopColor: "#E0E0E0",
          height: 60,
          paddingBottom: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="listProduct"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flask-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
