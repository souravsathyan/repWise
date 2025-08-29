import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <StatusBar style="dark" />
      <Slot />
    </ClerkProvider>
  );
}
