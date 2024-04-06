import { Stack } from "expo-router";
import React from "react";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen
        name="chat"
        options={{
          animation: "slide_from_right",
          animationDuration: 0,
          animationTypeForReplace: "push",
        }}
      />
    </Stack>
  );
}
