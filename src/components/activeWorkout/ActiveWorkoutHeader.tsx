import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useStopwatch } from "react-timer-hook";
import { useAppStore } from "@/store/store";
import { useFocusEffect } from "expo-router";

const ActiveWorkoutHeader = ({
  handleOpenModal,
  reset,
  minutes,
  seconds,
}: {
  handleOpenModal: () => void;
  reset: (offset?: Date, newAutoStart?: boolean) => void;
  minutes: number;
  seconds: number;
}) => {
  const { setWeightUnit, weightUnit, workoutExercises } = useAppStore();

  const getWorkoutDuration = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useFocusEffect(
    useCallback(() => {
      if (workoutExercises.length === 0) {
        reset();
      }
    }, [reset, workoutExercises.length])
  );
  return (
    <View className="bg-gray-800 px-6 py-4">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-white text-xl font-semibold">
            Active Workout
          </Text>
          <Text className="text-gray-300">{getWorkoutDuration()}</Text>
        </View>
        <View className="flex-row item-center space-x-3 gap-2">
          <View className="flex-row bg-gray-700 rounded-lg p-1">
            <TouchableOpacity
              onPress={() => setWeightUnit("lbs")}
              className={`px-3 py-1 rounded ${
                weightUnit === "lbs" ? "bg-blue-600" : ""
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  weightUnit === "lbs" ? "text-white" : "text-gray-300"
                }`}
              >
                lbs
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setWeightUnit("kg")}
              className={`px-3 py-1 rounded ${
                weightUnit === "kg" ? "bg-blue-600" : ""
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  weightUnit === "kg" ? "text-white" : "text-gray-300"
                }`}
              >
                kg
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-lg"
            onPress={handleOpenModal}
          >
            <Text className="text-white font-medium">End Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ActiveWorkoutHeader;
