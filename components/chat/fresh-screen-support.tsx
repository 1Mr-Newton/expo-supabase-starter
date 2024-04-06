import React, { useState } from "react";
import { View, Text } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { chatStyles as styles } from "@/components/styles";

const NewChatSupport = () => {
  const support = [
    {
      title: "How to use",
      icon: "info-circle",
      color: "#5a5b61",
    },
    {
      title: "Capabilities",
      icon: "flash",
      color: "#5a5b61",
    },
    {
      title: "Limitations",
      icon: "warning",
      color: "#5a5b61",
    },
  ];

  const suggestions = [
    {
      title: "Tell me a fun fact",
      prompt: "Tell me some fun facts about the Roman Empire",
    },
    {
      title: "Explain the concept of a black hole",
      prompt:
        "Explain the concept of a black hole to me like I'm five years old",
    },
    {
      title: "Explain nostalgia to a kindergartener",
      prompt: "Explain nostalgia to a kindergartener",
    },
    {
      title: "Write a letter to my boss telling him I will be late to work",
      prompt: "Write a letter to my boss telling him I will be late to work",
    },
  ];
  return (
    <View>
      {support.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginTop: 10,
            backgroundColor: "#f7f7f7",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 20,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FontAwesome
              name={item.icon as any}
              size={18}
              color="#5a5b61"
              style={
                index === 1
                  ? { ...styles.smallBtn, paddingLeft: 4 }
                  : { ...styles.smallBtn }
              }
            />
            <Text>{item.title}</Text>
          </View>
          <AntDesign name="down" size={10} color="#5a5b61" />
        </View>
      ))}
    </View>
  );
};

export default NewChatSupport;
