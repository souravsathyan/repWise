import {
  View,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAppStore } from "@/store/store";
import BottomAlertModal from "@/components/BottomAlert";
import { useRouter } from "expo-router";
import ActiveWorkoutHeader from "@/components/activeWorkout/ActiveWorkoutHeader";
import Ionicons from "@expo/vector-icons/Ionicons";
import AddExercise from "@/components/activeWorkout/AddExercise";
import ExerciseSelectionModal from "@/components/activeWorkout/ExerciseSelectionModal";

const ActiveWorkout = () => {
  const { restWorkout, workoutExercises } = useAppStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const endWorkout = () => {
    restWorkout();
    router.back();
  };

  return (
    <View className="flex-1 ">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View
        className="bg-gray-800 "
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      />
      <ActiveWorkoutHeader handleOpenModal={handleOpenModal} />
      <View className="flex-1 bg-white">
        <View className="px-6 mt-4">
          <Text className="text-center text-gray-600 mb-2">
            {workoutExercises.length} exercies
          </Text>
        </View>
        {/* If no exercises, show a message */}
        {workoutExercises.length === 0 && (
          <View className="bg-gray-50 rounded-2xl p-8 items-center mx-6">
            <Ionicons name="barbell-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-600 text-lg text-center mt-4 font-medium">
              No exercises yet
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Get started by adding your first exercise below
            </Text>
          </View>
        )}
        <AddExercise workoutExercises={workoutExercises} />
      </View>
      <BottomAlertModal
        message="Do you want to end this workout?"
        title="End Workout"
        visible={open}
        onClose={handleCloseModal}
        onConfirm={endWorkout}
        btnText="End"
      />
    </View>
  );
};

export default ActiveWorkout;
