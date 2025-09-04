import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface WorkoutSet {
  id: string;
  reps: string;
  weight: string;
  weightUnit: "kg" | "lbs";
  isCOmpleted: boolean;
}

interface workoutExercise {
  id: string;
  documentId: string;
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutSlice {
  workoutExercises: workoutExercise[];
  weightUnit: "kg" | "lbs";
  addExerciseToWorkout: (exercise: {
    name: string;
    documentId: string;
  }) => void;
  setWorkoutExercises: (
    exercises:
      | workoutExercise[]
      | ((prev: workoutExercise[]) => workoutExercise[])
  ) => void;
  setWeightUnit: (unit: "kg" | "lbs") => void;
  restWorkout: () => void;
}

export const createWorkoutSlice: StateCreator<WorkoutSlice> = (set) => ({
  workoutExercises: [],
  weightUnit: "lbs",
  addExerciseToWorkout: (exercise) =>
    set((state) => {
      const newExercise: workoutExercise = {
        id: Math.random().toString(),
        documentId: exercise.documentId,
        name: exercise.name,
        sets: [],
      };
      return {
        workoutExercises: [...state.workoutExercises, newExercise],
      };
    }),
  setWorkoutExercises: (exercises) =>
    set((state) => ({
      workoutExercises:
        typeof exercises === "function"
          ? exercises(state.workoutExercises)
          : exercises,
    })),
  setWeightUnit: (unit) => set({ weightUnit: unit }),
  restWorkout: () => set((state) => ({ workoutExercises: [] })),
});

export const persistedWorkoutSlice = persist(createWorkoutSlice, {
  name: "workout-store",
  storage: createJSONStorage(() => AsyncStorage),
  partialize: (state) => ({
    weightUnit: state.weightUnit,
  }),
});
