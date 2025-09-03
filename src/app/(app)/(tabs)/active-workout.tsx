import {
  Text,
  SafeAreaView,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";

const ActiveWorkout = () => {
  const [weightUnit, setWeightUnit] = useState("kg");
  const { minutes, seconds } = useStopwatch({ autoStart: true });

  const getWorkoutDuration = () => {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View className="flex-1 ">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View
        className="bg-gray-800 "
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      >
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
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActiveWorkout;
