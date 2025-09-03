import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  formatDate,
  formatDuration,
  formatWorkoutDuration,
  getExerciseNames,
  getTotalSets,
} from "@/lib/helpers";
import { useRouter } from "expo-router";
import { Workout } from "@/lib/strapi/workout";

interface WorkoutItemProps {
  workout: Workout;
  router: ReturnType<typeof useRouter>;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, router }) => {
  return (
    <TouchableOpacity
      key={workout.id}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-4"
      activeOpacity={0.7}
      onPress={() => {
        router.push({
          pathname: "/history/workout-record",
          params: {
            workoutId: workout.id,
          },
        });
      }}
    >
      {/* Workout header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {formatDate((workout?.date as string) || "")}
          </Text>
          <View className="flex-row items-center mt-1">
            <Ionicons name="time-outline" size={16} color="#687280" />
            <Text className="text-gray-600 ml-2">
              {formatWorkoutDuration(workout.duration)}
            </Text>
          </View>
        </View>
        <View className="bg-blue-100 rounded-xl w-12 h-12 items-center justify-center">
          <Ionicons name="fitness-outline" size={24} color="#3B82F6" />
        </View>
      </View>
      {/* stats */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="bg-gray-100 rounded-lg px-3 py-2 mr-3">
            <Text className="text-sm font-medium text-gray-700">
              {workout.exercises?.length || 0} exercises
            </Text>
          </View>
          <View className="bg-gray-100 rounded-lg px-3 py-2">
            <Text className="text-sm font-medium text-gray-700">
              {getTotalSets(workout)} sets
            </Text>
          </View>
        </View>
      </View>

      {/* Exercise list */}
      {workout.exercises && workout.exercises.length > 0 && (
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Exercises:
          </Text>
          <View className="flex-row flex-wrap">
            {getExerciseNames(workout)
              .slice(0, 3)
              .map((name, index) => (
                <View className="bg-blue-50 rounded-lg px-3 py-1 mr-2 mb-2">
                  <Text className="text-blue-700 text-sm font-medium">
                    {name}
                  </Text>
                </View>
              ))}
            {getExerciseNames(workout).length > 3 && (
              <View className="bg-gray-100 rounded-lg px-3 py-1 mr-2 mb-2">
                <Text className="text-gray-600 text-sm font-medium">
                  +{getExerciseNames(workout).length - 3} more
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default WorkoutItem;
