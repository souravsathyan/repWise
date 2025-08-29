import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <ClerkProvider tokenCache={tokenCache}>
        <StatusBar style="dark" />
        <Slot />
        <Toaster theme="light" />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
