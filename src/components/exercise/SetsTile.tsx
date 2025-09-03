import { View, Text } from "react-native";
import React from "react";
import { WorkoutSets } from "@/lib/strapi/workoutSets";
import Ionicons from "@expo/vector-icons/Ionicons";

const SetsTile = ({ set, index }: { set: WorkoutSets; index: number }) => {
  return (
    <View className="bg-gray-50 rounded-lg p-3 flex-row items-center justify-between">
      {/* reps */}
      <View className="flex-row items-center">
        <View className="bg-gray-200 rounded-full w-6 h-6 items-center justify-center mr-3">
          <Text className="text-gray-700 text-xs font-medium">{index + 1}</Text>
        </View>
        <Text className="text-gray-900 font-medium">{set.reps} reps</Text>
      </View>
      {/* sets */}
      {set?.weight && (
        <View className="flex-row items-center">
          <Ionicons name="barbell-outline" size={16} color={"#6B7280"} />
          <Text className="text-gray-700 ml-2 font-medium">
            {set.weight} {set.weightUnit || "lbs"}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SetsTile;
