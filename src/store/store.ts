import { create } from "zustand";
import { persistedWorkoutSlice, WorkoutSlice } from "./slices/workoutSlice";

export const useAppStore = create<WorkoutSlice>((...a) => ({
  ...persistedWorkoutSlice(...a),
}));
