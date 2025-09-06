import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

interface Props {
  router: ReturnType<typeof useRouter>;
}

export default function QuickActions({ router }: Props) {
  return (
    <View className="px-6 mb-4">
      <Text className="text-lg font-semibold text-gray-900 mb-4">
        Quick Actions
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/workout")}
        className="bg-blue-600 rounded-2xl p-6 mb-4 shadow-sm"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center mr-4">
              <Ionicons name="play" size={24} color="white" />
            </View>
            <View>
              <Text className="text-white text-xl font-semibold">
                Start Workout
              </Text>
              <Text className="text-blue-100">Begin your training session</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
