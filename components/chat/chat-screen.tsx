import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";
import { chatStyles as styles } from "@/components/styles";
import { useChatRoomStore } from "@/stores/ChatStore";
import useAuthStore from "@/stores/AuthStore";
import SendBox from "./sendbox";
import { ChatMessagex } from "./chat-messagex";

export default function ChatScreen() {
  const newChat = useChatRoomStore((state) => state.newChat);
  const chatRoom = useChatRoomStore((state) => state.chatRoom);

  useEffect(() => {
    newChat();

    return () => {};
  }, []);

  const Content = () => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} onTouchStart={Keyboard.dismiss}>
        {chatRoom.messages.length !== 0 && (
          <FlatList
            data={chatRoom.messages}
            renderItem={({ item }) => (
              <View>
                <ChatMessagex
                  key={item.id}
                  user={item.user}
                  ai={item.ai}
                  id={item.id}
                  followUp={item.followUp}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
        {chatRoom.messages.length === 0 && (
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {`Welcome to VertexAI\nCheck how to use, capabilities and limitations.`}
            </Text>
          </View>
        )}
      </View>
      <SendBox />
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="inverted" />
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <Content />
        </KeyboardAvoidingView>
      ) : (
        <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 8 }}>
          <Content />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
type ItemProps = { title: string };
const Item = ({ title }: ItemProps) => (
  <View style={styless.item}>
    <Text style={styless.title}>{title}</Text>
  </View>
);
const styless = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
