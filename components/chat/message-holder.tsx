import { View, Text } from "react-native";
import React from "react";
import { messageHolderStyle as styles } from "@/components/styles";
import { AiMessage, UserMessage } from "@/types";
import Markdown from "react-native-markdown-display";
import { UserExtaButtons } from "./user-extra-button";
import { customRules } from "./custom-rules";
import { AiExtaButtons } from "./ai-extra-buttons";
import ImageExtraButtons from "./image-extra-buttons";
import { Image } from "expo-image";

export const MessageHolder = ({
  type,
  isUser,
}: {
  type: AiMessage | UserMessage;
  isUser?: boolean;
}) => {
  const content = type.content.text;
  const alignStyle = isUser ? styles.alignRight : styles.alignLeft;

  return (
    <>
      <View style={[styles.messageContainer, alignStyle]}>
        {isUser && type.content.image && (
          <Image
            source={type.content.image}
            style={{ width: 200, height: 300 }}
          />
        )}
        {isUser ? (
          <Text style={{ color: isUser ? "#606060" : "white", fontSize: 16 }}>
            {content}
          </Text>
        ) : (
          <View>
            <Markdown rules={customRules}>{content}</Markdown>
          </View>
        )}

        {isUser ? <UserExtaButtons /> : <AiExtaButtons />}
      </View>
      {!isUser && type.content.image && (
        <View
          style={{
            padding: 10,
            backgroundColor: "#6d8bf8",
            width: "80%",
            marginHorizontal: 5,
            marginBottom: 5,
            borderRadius: 10,
          }}
        >
          <Image
            source={type.content.image}
            contentFit="cover"
            style={{
              maxWidth: "100%",
              height: 300,
              borderRadius: 10,
            }}
          />
          <ImageExtraButtons />
        </View>
      )}
      {/* {!isUser && <FollowUp />} */}
    </>
  );
};
