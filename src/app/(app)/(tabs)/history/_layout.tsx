import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const Layout = () => {
  const { workoutId } = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="workout-record"
        options={{
          title: "Workout Record",
          headerBackTitle: "History",
        }}
      />
    </Stack>
  );
};

export default Layout;
