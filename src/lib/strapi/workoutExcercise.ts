import { Exercise } from "./exercise";
import { WorkoutSets } from "./workoutSets";

export interface WorkoutExcercise {
  id?: number;
  exercise?: number | Exercise | null;
  sets?: WorkoutSets[] | null;
}
