import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#f2ebe3" },
        headerTintColor: "#4a3b2d",
      }}
    />
  );
}
