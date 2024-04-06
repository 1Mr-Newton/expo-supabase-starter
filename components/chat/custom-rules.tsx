import { View, Text, Platform } from "react-native";
import React from "react";
import { CopyExpandButtons } from "./copy-expand-buttons";

export const customRules = {
  text: (node: any) => (
    <Text key={node.key} style={{ color: "white" }}>
      {node.content}
    </Text>
  ),
  code_inline: (node: any) => (
    <Text
      key={node.key}
      style={{
        fontWeight: "bold",
        color: "#444",
      }}
    >
      {node.content}
    </Text>
  ),
  th: (node: any, children: any, parent: any, styles: any) => (
    <View
      key={node.key}
      style={{ ...styles._VIEW_SAFE_th, backgroundColor: "black" }}
    >
      {children}
    </View>
  ),
  tr: (node: any, children: any, parent: any, styles: any) => (
    <View key={node.key} style={styles._VIEW_SAFE_tr}>
      {children}
    </View>
  ),
  td: (node: any, children: any, parent: any, styles: any) => (
    <View
      key={node.key}
      style={{
        ...styles._VIEW_SAFE_th,
        borderWidth: 1,
        borderColor: "#444",
        padding: 5,
        backgroundColor: "#1f1f1f",
      }}
    >
      {children}
    </View>
  ),
  fence: (node: any) => {
    let { content } = node;

    if (
      typeof node.content === "string" &&
      node.content.charAt(node.content.length - 1) === "\n"
    ) {
      content = node.content.substring(0, node.content.length - 1);
    }

    const language = node.sourceInfo || null;
    return (
      <View
        key={node.key}
        style={{
          backgroundColor: "#1f1f1f",
          borderRadius: 10,
          // padding: 8,
        }}
      >
        <CopyExpandButtons content={content} language={language} />
        <Text
          style={{
            color: "#999",
            fontSize: 13,
            padding: 8,
            fontWeight: "600",
            fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
          }}
        >
          {content}
        </Text>
      </View>
    );
  },
};
