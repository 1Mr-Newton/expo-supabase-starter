import React, { useEffect, useRef } from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";

import { chatStyles as styles } from "@/components/styles";
import { formatTime, uuidv4 } from "@/helpers";
import { useChatRoomStore } from "@/stores/ChatStore";
import { ChatMessage } from "@/types";
import { Image } from "expo-image";
import { commandsIcons } from "@/constants/images";
import useAuthStore from "@/stores/AuthStore";

const SendBox = () => {
  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const textInputRef = React.useRef<TextInput>(null);
  const [inputText, setInputText] = React.useState("");
  const [_, setTime] = React.useState<number>(0);
  const intervalIdRef = React.useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = React.useState<string>("00:00:00");

  const [extrasOpen, setExtrasOpen] = React.useState<boolean>(false);

  const addMessage = useChatRoomStore((state) => state.addMessage);
  const chatRoom = useChatRoomStore((state) => state.chatRoom);
  const updateMessage = useChatRoomStore((state) => state.updateMessage);

  const setSocket = useChatRoomStore((state) => state.setSocket);
  const socketUrl = useChatRoomStore((state) => state.socketUrl);
  const session = useAuthStore((state) => state.session);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connect = () => {
      try {
        socketRef.current = new WebSocket(
          `${socketUrl}?token=${session?.access_token}`
        );

        setSocket(socketRef.current);

        socketRef.current.onclose = async (event: WebSocketCloseEvent) => {
          console.log("Disconnected, Reason: ", event.reason);
        };

        socketRef.current.onerror = (error: any) => {
          socketRef.current?.close();
        };
      } catch (error) {
        socketRef.current?.close();
      }
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current?.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") {
      return;
    }

    setInputText("");

    const newMessage: ChatMessage = {
      id: uuidv4(),
      followUp: null,
      user: {
        id: uuidv4(),
        content: {
          text: inputText,
          createdAt: new Date(),
          id: uuidv4(),
          audio: null,
          image: null,
        },
      },
      ai: {
        id: uuidv4(),
        content: {
          audio: null,
          id: uuidv4(),
          text: `
  In the \`react-native-markdown-display\` package, when creating custom rules for code blocks, you have specified the language for syntax highlighting as "python" in both \`code_block\` and \`fence\` rules. However, if you want to dynamically determine the language based on the content or some other factor, you can access the language information from the \`node\` object.

In the provided code, the \`node\` object contains a \`lang\` property that represents the language of the code block. You can use this property to dynamically set the language for syntax highlighting.

Here's an updated version of your code with the dynamic language based on the \`lang\` property:

\`\`\`typescript
const customRules = {
  code_inline: (
    node: any,
    children: any,
    parent: any,
    styles: any,
    inheritedStyles = {}
  ) => (
    <Text key={node.key} style={{ fontWeight: "bold", color: "#555" }}>
      {node.content}
    </Text>
  ),
  code_block: (node: any, children: any, parent: any, styles: any) => {
    const language = node.lang || 'plaintext'; // Default to plaintext if lang is not specified
    return (
      <SyntaxHighlighter
        key={node.key}
        language={language}
        highlighter={"prism"}
        style={tomorrow}
      >
        {node.content}
      </SyntaxHighlighter>
    );
  },
  fence: (node: any, children: any, parent: any, styless: any) => {
    const language = node.lang || 'plaintext'; // Default to plaintext if lang is not specified
    return (
      <SyntaxHighlighter
        key={node.key}
        language={language}
        highlighter={"prism"}
        style={tomorrow}
      >
        {node.content}
      </SyntaxHighlighter>
    );
  },
};
\`\`\`

In this code, \`node.lang\` is used to determine the language of the code block. If \`node.lang\` is not present or empty, it defaults to "plaintext." Adjust the default value or handling according to your requirements.`,
          createdAt: new Date(),
          image: "https://i.imgur.com/TkIrScD.png",
        },
      },
    };

    addMessage(newMessage);
    chatRoom.messages.push(newMessage);

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current?.send(JSON.stringify(chatRoom));
      socketRef.current!.onmessage = (event: WebSocketMessageEvent) => {
        newMessage.ai.content.text += event.data;
        console.log("====================================");
        console.log(newMessage.ai.content.text);
        console.log("====================================");

        updateMessage(newMessage);
      };
    } else {
      console.log("====================================");
      console.log("socket is not open");
      console.log("====================================");
    }
  };

  const reset = () => {
    setIsRecording(false);
    setTime(0);
    setElapsedTime("00:00:00");
    intervalIdRef.current && clearInterval(intervalIdRef.current);
  };

  const startSpeechToText = async () => {
    setIsRecording(true);
    intervalIdRef.current = setInterval(() => {
      setTime((prev) => {
        const newTime = prev + 1;
        setElapsedTime(formatTime(newTime));
        return newTime;
      });
    }, 1000);
  };

  const stopSpeechToText = async () => {
    reset();
  };

  const onSpeechPartialResults = (result: any) => {
    if (result.value) {
      setInputText(result.value[0]);
    }
  };

  const onSpeechResults = (result: any) => {
    if (result.value) {
      setInputText(result.value[0]);
    }
    reset();
  };

  const onSpeechError = (error: any) => {
    reset();
  };

  return (
    <>
      {extrasOpen && (
        <View style={styles.extras}>
          <FontAwesome
            name="file"
            size={18}
            color="#5a5b61"
            style={styles.smallBtn}
          />
          <FontAwesome
            name="camera"
            size={18}
            color="#5a5b61"
            style={styles.smallBtn}
          />
          <FontAwesome
            name="picture-o"
            size={18}
            color="#5a5b61"
            style={styles.smallBtn}
          />
        </View>
      )}

      <View style={{ ...styles.sendbox }}>
        <TouchableWithoutFeedback
          onPress={() => setExtrasOpen((prev) => !prev)}
        >
          <Image
            source={commandsIcons}
            style={{
              ...styles.image,
              minHeight: 20,
              minWidth: 20,
              // backgroundColor: "red",
            }}
          />
        </TouchableWithoutFeedback>
        <TextInput
          selectionColor="#4a6ff9"
          ref={textInputRef}
          editable={!isRecording}
          multiline
          placeholder={isRecording ? "I'm listening" : "Ask anything..."}
          style={{
            maxHeight: 200,
            minHeight: 20,
            flex: 1,
            // backgroundColor: "blue",
            padding: 0,
            margin: 0,
          }}
          onChange={(e) => setInputText(e.nativeEvent.text)}
          value={inputText}
        />

        {!isRecording ? (
          <View style={styles.smallBTNContainer}>
            {!inputText && (
              <TouchableWithoutFeedback onPress={startSpeechToText}>
                <FontAwesome
                  name="microphone"
                  size={20}
                  color="#5a5b61"
                  style={{ ...styles.smallBtn }}
                />
              </TouchableWithoutFeedback>
            )}

            {inputText !== "" && (
              <TouchableWithoutFeedback onPress={() => sendMessage()}>
                <FontAwesome
                  name="send"
                  size={20}
                  color="#5a5b61"
                  style={styles.smallBtn}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        ) : (
          <View style={styles.smallBTNContainer}>
            <Text>{elapsedTime}</Text>

            <FontAwesome
              name="circle"
              size={12}
              color="red"
              style={styles.smallBtn}
            />

            <TouchableWithoutFeedback onPress={stopSpeechToText}>
              <Text style={styles.cancelRecord}>Cancel</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    </>
  );
};

export default SendBox;
