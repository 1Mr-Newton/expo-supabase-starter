import { View, Text } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { messageHolderStyle as styles } from "@/components/styles";
import { Image } from "expo-image";
export const ExtraButton = ({
  icon,
  iconPath,
  text,
  size,
}: {
  icon?: string;
  iconPath?: string;
  text: string;
  size?: number;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        backgroundColor: "#dce4ff",
        height: 28,
        paddingHorizontal: 15,
        borderRadius: 30,
      }}
    >
      {icon ? (
        <MaterialCommunityIcons
          name={icon as any}
          size={14}
          color="#1f4ef9"
          style={{
            fontWeight: "bold",
          }}
        />
      ) : (
        <Image
          source={iconPath}
          style={{
            ...styles.image,
            width: size,
            height: size,
          }}
        />
      )}

      <Text
        style={{
          fontSize: 12,
          fontWeight: "500",
          color: "#1f4ef9",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
