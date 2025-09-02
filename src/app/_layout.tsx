import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { Toaster } from "sonner-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Layout() {
  const queryClient = new QueryClient();
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider tokenCache={tokenCache}>
          <Slot />
          <Toaster theme="light" />
        </ClerkProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
