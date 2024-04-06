import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ExtraButton } from "./extra-button";
import { downloadIcon, regenerateIcon, shareIcon } from "@/constants/images";

const ImageExtraButtons = () => {
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
        style={{ marginTop: 10, gap: 5 }}
      >
        <ExtraButton text="Save" iconPath={downloadIcon} size={18} />
        <ExtraButton text="Share" iconPath={shareIcon} size={20} />
        <ExtraButton text="Reimagine" iconPath={regenerateIcon} size={16} />
      </ScrollView>
    </View>
  );
};

export default ImageExtraButtons;
