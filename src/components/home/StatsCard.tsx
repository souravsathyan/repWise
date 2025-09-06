import { View, Text } from "react-native";
import React from "react";
import { Workout } from "@/lib/strapi/workout";
import { formatDuration } from "@/lib/helpers";

interface Props {
  workouts?: Workout[];
}

export default function StatsCard({ workouts }: Props) {
  const totalWorkouts = workouts?.length || 0;
  const totalDuration =
    workouts?.reduce((sum, w) => sum + (w.duration || 0), 0) || 0;
  const averageDuration = totalWorkouts
    ? Math.round(totalDuration / totalWorkouts)
    : 0;

  return (
    <View className="px-6 mb-6">
      <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Text className="text-lg font-semibold text-gray-900 mb-4">
          Your Stats
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-blue-600">
              {totalWorkouts}
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Total{"\n"}Workouts
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-green-600">
              {formatDuration(totalDuration)}
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Total{"\n"}Time
            </Text>
          </View>
          <View className="items-center flex-1">
            <Text className="text-2xl font-bold text-purple-600">
              {averageDuration > 0 ? formatDuration(averageDuration) : "0m"}
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Average{"\n"}Duration
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
