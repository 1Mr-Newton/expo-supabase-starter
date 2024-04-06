import React, { createContext, useContext, useState, ReactNode } from "react";

import { ScrollView, View } from "react-native";
import { MessageHolder } from "./message-holder";
import { ChatMessage } from "@/types";
import { uuidv4 } from "@/helpers";

export const ChatMessagex = ({ ai, user, id }: ChatMessage) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ height: "100%" }}
    >
      <View key={id}>
        <MessageHolder type={user} isUser />
        {ai.content.text && <MessageHolder type={ai} />}
      </View>
    </ScrollView>
  );
};
