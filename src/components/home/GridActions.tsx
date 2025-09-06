import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

interface Props {
  router: ReturnType<typeof useRouter>;
}

export default function GridActions({ router }: Props) {
  return (
    <View className="px-6 flex-row gap-4 mb-4">
      <TouchableOpacity
        onPress={() => router.push("/history")}
        className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-gray-100"
        activeOpacity={0.7}
      >
        <View className="items-center">
          <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
            <Ionicons name="time-outline" size={24} color="#687280" />
          </View>
          <Text className="text-gray-900 font-medium text-center">
            Workout{"\n"}History
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/excercises")}
        className="bg-white rounded-2xl p-4 flex-1 shadow-sm border border-gray-100"
        activeOpacity={0.7}
      >
        <View className="items-center">
          <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mb-3">
            <Ionicons name="barbell-outline" size={24} color="#687280" />
          </View>
          <Text className="text-gray-900 font-medium text-center">
            Browse{"\n"}Exercises
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
