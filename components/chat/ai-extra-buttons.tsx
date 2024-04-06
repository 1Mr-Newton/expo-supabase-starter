import { View, ScrollView } from "react-native";
import React from "react";
import {
  copyIcon,
  imagineIcon,
  regenerateIcon,
  shareIcon,
  volumeIcon,
} from "@/constants/images";
import { ExtraButton } from "./extra-button";
export const AiExtaButtons = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
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
        <ExtraButton text="Listen" iconPath={volumeIcon} size={20} />
        <ExtraButton text="Share" iconPath={shareIcon} size={20} />
        <ExtraButton text="Re-generate" iconPath={regenerateIcon} size={16} />
        <ExtraButton text="Imagine" iconPath={imagineIcon} size={20} />
      </ScrollView>
    </View>
  );
};
