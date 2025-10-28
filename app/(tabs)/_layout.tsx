import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 👉 ini menyembunyikan teks "(tabs)" dan "Home Page"
        tabBarActiveTintColor: "#8B4513", // warna aktif sesuai tema Krisped
        tabBarInactiveTintColor: "#BCAAA4", // warna abu lembut
        tabBarStyle: {
          backgroundColor: "#F5F3F1", // warna latar bawah tab
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
          title: "Home", // teks di tab bar bawah, bukan di header
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
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
