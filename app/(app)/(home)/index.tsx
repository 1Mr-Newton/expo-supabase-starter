import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import { Button } from "@/components/ui";
import useAuthStore from "@/stores/AuthStore";

export default function TabOneScreen() {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="inverted" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          columnGap: 5,
        }}
      >
        <View style={{ marginBottom: 30 }}></View>

        <Button
          style={tw`w-full mb-6`}
          label="Chat"
          onPress={() => {
            router.push({
              pathname: "/chat",
              // params: {},
            });
          }}
        />

        <Button
          style={tw`w-full`}
          label="Sign out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </View>
  );
}
