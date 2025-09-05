import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppStore } from "@/store/store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { workoutExercise, WorkoutSet } from "@/store/slices/workoutSlice";
import ExerciseSelectionModal from "./ExerciseSelectionModal";
import { useRouter } from "expo-router";
import TextInputField from "../formFields/TextInputField";

interface Props {
  workoutExercises: workoutExercise[];
}

const AddExercise = ({ workoutExercises }: Props) => {
  const [showWxerciseSelection, setShowExerciseSelection] = useState(false);
  const router = useRouter();
  const { setWorkoutExercises, weightUnit } = useAppStore();

  const addExercise = () => {
    setShowExerciseSelection(true);
  };

  const addNewSet = (exId: number) => {
    const newWorkoutSet: WorkoutSet = {
      reps: "",
      weight: "",
      weightUnit: weightUnit,
      isCompleted: false,
      id: Math.random().toString(),
    };
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exId
          ? { ...exercise, sets: [...exercise.sets, newWorkoutSet] }
          : exercise
      )
    );
  };

  const updateSet = (
    exerciseId: number,
    setId: string,
    field: "reps" | "weight",
    value: string
  ) => {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId ? { ...set, [field]: value } : set
              ),
            }
          : exercise
      )
    );
  };

  const toggleSetCompletion = (exerciseId: number, setId: string) => {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? { ...set, isCompleted: !set.isCompleted }
                  : set
              ),
            }
          : exercise
      )
    );
  };

  const deleteSet = (exerciseId: number, setId: string) => {
    setWorkoutExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.filter((set) => set.id !== setId),
            }
          : exercise
      )
    );
  };

  const deleteExercise = (exerciseId: number) => {
    setWorkoutExercises((exercises) =>
      exercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={20}
      contentContainerStyle={{ flexGrow: 1, padding: 12 }}
    >
      <View className="flex-1 px-2 mt-4">
        {workoutExercises.map((exercise) => (
          <View key={exercise.id} className="mb-8">
            <TouchableOpacity
              className="p-4 mb-3 bg-blue-50 rounded-2xl"
              onPress={() => {
                return router.push({
                  pathname: "/exercise-detail",
                  params: {
                    id: exercise.id,
                  },
                });
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-900 mb-2">
                    {exercise.name}
                  </Text>
                  <Text className="text-gray-600">
                    {exercise.sets.length} sets •{" "}
                    {exercise.sets.filter((set) => set.isCompleted).length}{" "}
                    completed
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteExercise(exercise.id)}
                  className="w-10 h-10 rounded-xl items-center justify-center bg-red-500 ml-3"
                >
                  <Ionicons name="trash" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
              <Text className="text-lg font-semibold text-gray-900 mb-3">
                Sets
              </Text>
              {exercise.sets.length === 0 ? (
                <Text className="text-gray-500 text-center py-4">
                  No sets yet. Add your first set below.
                </Text>
              ) : (
                exercise.sets.map((set, setIndex) => (
                  <View
                    key={set.id}
                    className={`py-3 px-3 mb-2 rounded-lg border ${
                      set.isCompleted
                        ? "bg-green-100 border-green-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <View className="flex-row items-center justify-between">
                      <Text className="text-gray-700 font-medium w-8">
                        {setIndex + 1}
                      </Text>
                      {/* Reps input */}
                      <View className="flex-1 mx-2">
                        <TextInputField
                          value={set.reps}
                          onChangeText={(value) =>
                            updateSet(exercise.id, set.id, "reps", value)
                          }
                          isLoading={!set.isCompleted ? true : false}
                          keyboardType="numeric"
                          placeholder="0"
                          label="Reps"
                          hideIcon
                          inputPadding="px-0 py-0"
                        />
                      </View>
                      <View className="flex-1 mx-2">
                        <TextInputField
                          value={set.weight}
                          onChangeText={(value) =>
                            updateSet(exercise.id, set.id, "weight", value)
                          }
                          isLoading={!set.isCompleted ? true : false}
                          keyboardType="numeric"
                          placeholder="0"
                          label="Weight"
                          hideIcon
                          showWeight={true}
                          weightUnit={weightUnit}
                          inputPadding="px-0 py-0"
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => toggleSetCompletion(exercise.id, set.id)}
                        className={`w-12 h-12 rounded-xl items-center justify-center mx-1 mt-3 ${
                          set.isCompleted ? "bg-green-500" : "bg-gray-200"
                        }`}
                      >
                        <Ionicons
                          name={
                            set.isCompleted ? "checkmark" : "checkmark-outline"
                          }
                          size={20}
                          color={set.isCompleted ? "white" : "#9CA3AF"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => deleteSet(exercise.id, set.id)}
                        className="w-12 h-12 rounded-xl items-center justify-center bg-red-500 ml-1 mt-3"
                      >
                        <Ionicons name="trash" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
              <TouchableOpacity
                onPress={() => addNewSet(exercise.id)}
                className="bg-blue-100 border border-blue-200 rounded-lg py-3 items-center mt-2"
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="add"
                    size={16}
                    color="#3B82F6"
                    style={{ marginRight: 6 }}
                  />
                  <Text className="text-blue-600 font-medium">Add Set</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      {/* Add Exercise Button */}
      <TouchableOpacity
        onPress={addExercise}
        className="bg-blue-600 rounded-2xl py-4 items-center mb-8 active:bg-blue-700"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="add"
            size={20}
            color="white"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-semibold text-lg">Add Exercise</Text>
        </View>
      </TouchableOpacity>
      <ExerciseSelectionModal
        visible={showWxerciseSelection}
        onClose={() => setShowExerciseSelection(false)}
      />
    </KeyboardAwareScrollView>
  );
};

export default AddExercise;
