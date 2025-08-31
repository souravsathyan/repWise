import { Exercise } from './exercise';
import { WorkoutSets } from './workoutSets';

export interface WorkoutExcercise {
  id?: number;
  exercise?: Exercise | null;
  sets?: WorkoutSets[] | null;
};
