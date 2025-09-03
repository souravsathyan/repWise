import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useDeleteWorkoutHistory,
  useGetWorkoutHistory,
} from "@/hooks/useWorkout";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  formatDuration,
  formatHistoryDate,
  formatHistoryTime,
} from "@/lib/helpers";
import ExerciseRecordTiles from "@/components/exercise/ExerciseRecordTiles";
import BottomAlertModal from "@/components/BottomAlert";
import { toast } from "sonner-native";

const WorkoutRecord = () => {
  const { workoutId } = useLocalSearchParams();
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: workout, isLoading: loading } = useGetWorkoutHistory(
    workoutId as string,
    userId
  );
  const { mutateAsync, isPending: deleting } = useDeleteWorkoutHistory(userId);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const getTotalVolume = () => {
    let totalVolume = 0;
    let unit = "lbs";
    workout?.exercises?.forEach((exercise) => {
      exercise.sets?.forEach((set) => {
        if (set.weight && set.reps) {
          totalVolume += set.weight * set.reps;
          unit = set.weightUnit || "lbs";
        }
      });
    });
    return { volume: totalVolume, unit };
  };

  const onConfirm = async () => {
    if (workout) {
      await mutateAsync(workout?.documentId);
      router.back();
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3882F6" />
          <Text className="text-gray-600 mt-4">Loading your workouts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!workout) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-xl font-semibold text-gray-900 mt-4">
            Workout Not Found
          </Text>
          <Text className="text-gray-600 text-center mt-2">
            This workout record could not be found.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-blue-600 px-6 py-3 rounded-lg mt-6"
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
        I
      </SafeAreaView>
    );
  }

  const { unit, volume } = getTotalVolume();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="bg-white p-6 border-b border-gray-300">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-gray-900">
              Workout Summary
            </Text>
            <TouchableOpacity
              onPress={handleOpenModal}
              disabled={deleting}
              className="bg-red-600 px-4 py-2 rounded-lg flex-row items-center"
            >
              {deleting ? (
                <ActivityIndicator size={"small"} color={"#fff"} />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={16} color={"#fff"} />
                  <Text className="font-medium text-white ml-2">Delete</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          {/* date and time */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="calendar-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatHistoryDate(workout.date as string)} at{" "}
              {formatHistoryTime(workout.date as string)}
            </Text>
          </View>
          {/* duration */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="time-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {formatDuration(workout.duration)}
            </Text>
          </View>
          {/* Exercise */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="fitness-outline" size={20} color={"#6B7280"} />
            <Text className="text-gray-700 ml-3 font-medium">
              {workout.exercises?.length || 0} exercises
            </Text>
          </View>
          {/* volume */}
          {volume > 0 && (
            <View className="flex-row items-center">
              <Ionicons name="barbell-outline" size={20} color={"#6B7280"} />
              <Text className="text-gray-700 ml-3 font-medium">
                {volume.toLocaleString()} {unit} total volume
              </Text>
            </View>
          )}
        </View>
        <View className="space-y-4 p-4 gap-4">
          {workout.exercises?.map((workout, index) => (
            <ExerciseRecordTiles
              key={workout.id}
              workout={workout}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
      <BottomAlertModal
        message="Do you want to delete this workout history"
        title="Delete Workout History"
        visible={open}
        onClose={handleCloseModal}
        onConfirm={onConfirm}
        btnText="Delete"
      />
    </SafeAreaView>
  );
};

export default WorkoutRecord;
