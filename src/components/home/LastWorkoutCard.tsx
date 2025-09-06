import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Workout } from "@/lib/strapi/workout";
import { formatDate, formatDuration } from "@/lib/helpers";
import { useRouter } from "expo-router";

interface Props {
  workout: Workout;
  router: ReturnType<typeof useRouter>;
}

export default function LastWorkoutCard({ workout, router }: Props) {
  const getTotalSets = (workout: Workout) =>
    workout.exercises?.reduce((total, e) => total + (e.sets?.length || 0), 0) ||
    0;

  return (
    <View className="px-6 mb-8">
      <Text className="text-lg font-semibold text-gray-900 mb-4">
        Last Workout
      </Text>
      <TouchableOpacity
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: "/history/workout-record",
            params: { workoutId: workout.id },
          })
        }
      >
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-lg font-semibold text-gray-900">
              {formatDate(workout.date || "")}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-2">
                {workout.duration
                  ? formatDuration(workout.duration)
                  : "Duration not recorded"}
              </Text>
            </View>
          </View>
          <View className="bg-blue-100 rounded-full w-12 h-12 items-center justify-center">
            <Ionicons name="fitness-outline" size={24} color="#3882F6" />
          </View>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-600">
            {workout.exercises?.length || 0} exercises {getTotalSets(workout)}{" "}
            sets
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#6B7280" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
