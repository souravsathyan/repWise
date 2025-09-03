import { View, Text } from "react-native";
import React from "react";
import { WorkoutExcercise } from "@/lib/strapi/workoutExcercise";
import SetsTile from "./SetsTile";
import { WorkoutSets } from "@/lib/strapi/workoutSets";

const ExerciseRecordTiles = ({
  workout,
  index,
}: {
  workout: WorkoutExcercise;
  index: number;
}) => {
  return (
    <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-600">
            {workout?.exercise.name || "Unknown Exercise"}
          </Text>
          <Text className="text-sm mt-1 text-gray-600">
            {workout?.sets.length || 0} sets completed
          </Text>
        </View>
        <View className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center">
          <Text className="font-bold text-blue-600">{index + 1}</Text>
        </View>
      </View>

      {/* Sets */}
      <View className="space-y-2">
        <Text className="text-sm font-medium text-gray-700 mb-2">Sets:</Text>
        {workout?.sets.map((set: WorkoutSets, index) => {
          return <SetsTile set={set} key={set.id} index={index} />;
        })}
      </View>
      {/* Exercise Volume Summary */}
      {workout.sets && workout.sets.length > 0 && (
        <View className="mt-4 pt-4 border-t border-gray-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-gray-600">Exercise Volume:</Text>
            <Text className="text-sm font-medium text-gray-900">
              {workout.sets
                .reduce((total, set) => {
                  return total + (set.weight || 0) * (set.reps || 0);
                }, 0)
                .toLocaleString()}{" "}
              {workout.sets[0]?.weightUnit || "lbs"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExerciseRecordTiles;
