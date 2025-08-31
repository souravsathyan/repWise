import { WorkoutExcercise } from './workoutExcercise';

export interface Workout {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  userId?: string;
  date?: Date | string;
  duration?: number;
  exercises?: WorkoutExcercise[] | null;
};
