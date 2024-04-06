import { View, ScrollView } from "react-native";
import React from "react";
import { ExtraButton } from "./extra-button";
import { copyIcon, shareIcon } from "@/constants/images";
export const UserExtaButtons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        gap: 5,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 10,
          gap: 5,
        }}
      >
        <ExtraButton text="Copy" iconPath={copyIcon} size={18} />
        <ExtraButton text="Share" iconPath={shareIcon} size={20} />
      </ScrollView>
    </View>
  );
};
