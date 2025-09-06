import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

interface Props {
  router: ReturnType<typeof useRouter>;
}

export default function EmptyState({ router }: Props) {
  return (
    <View className="px-6 mb-8">
      <View className="bg-white rounded-2xl p-8 items-center shadow-sm border border-gray-100">
        <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
          <Ionicons name="barbell-outline" size={32} color="#3B82F6" />
        </View>
        <Text className="text-xl font-semibold text-gray-900 mb-2">
          Ready to start your fitness journey?
        </Text>
        <Text className="text-gray-600 text-center mb-4">
          Track your workouts and see your progress over time
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/workout")}
          className="bg-blue-600 rounded-xl px-6 py-3"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">
            Start Your First Workout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
