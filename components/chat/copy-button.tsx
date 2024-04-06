import { Text, Pressable } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export const CopyButton = ({ content }: { content: string }) => {
  const [text, setText] = useState("Copy");
  const [iconName, setIconName] = useState("content-copy" as any);

  const handleCopy = async ({ content }: { content: string }) => {
    try {
      await Clipboard.setStringAsync(content);
      setText("Copied!");
      setIconName("check");
      setTimeout(() => {
        setText("Copy");
        setIconName("content-copy");
      }, 1500);
    } catch (error) {}
  };

  return (
    <Pressable
      onPress={() => handleCopy({ content })}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <MaterialIcons name={iconName} size={12} color="#4a6ff9" />

      <Text
        style={{
          color: "#4a6ff9",
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
