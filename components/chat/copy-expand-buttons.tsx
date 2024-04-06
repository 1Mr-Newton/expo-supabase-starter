import { View, Text } from "react-native";
import React from "react";
import { CopyButton } from "./copy-button";

export const CopyExpandButtons = ({
  content,
  language,
}: {
  content: string;
  language: string;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#dce4ff",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 8,
      }}
    >
      <Text style={{ color: "#4a6ff9", fontSize: 12, fontWeight: "600" }}>
        {language}
      </Text>
      <CopyButton content={content} />
    </View>
  );
};
