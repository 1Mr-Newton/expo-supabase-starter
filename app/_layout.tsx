import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDeviceContext } from "twrnc";

import { SupabaseProvider } from "@/context/SupabaseProvider";
import tw from "@/lib/tailwind";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = { initialRouteName: "(auth)" };

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useDeviceContext(tw);

  return (
    <SupabaseProvider>
      <GestureHandlerRootView style={tw`flex-1`}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>
          <Toast />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </SupabaseProvider>
  );
}
