import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const HomeLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="browse" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default HomeLayout;
