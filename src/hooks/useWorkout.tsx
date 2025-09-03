import { Workout } from "@/lib/strapi/workout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteWorkoutHistory,
  getWorkoutHistories,
  getWorkoutHistory,
} from "../services/workout";
import { toast } from "sonner-native";

export const usegetWorkoutHistories = (userId: string) => {
  return useQuery<Workout[], Error>({
    queryKey: ["workout-histories", userId],
    queryFn: () => getWorkoutHistories(userId),
    staleTime: 1000 * 60 * 30,
    enabled: !!userId,
  });
};

export const useGetWorkoutHistory = (workoutId: string, userId: string) => {
  return useQuery<Workout | null, Error>({
    queryKey: ["workout-history", workoutId],
    queryFn: () => getWorkoutHistory(workoutId, userId),
    enabled: !!workoutId,
    staleTime: 1000 * 60 * 30,
  });
};

export const useDeleteWorkoutHistory = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation<Workout | null, Error, string>({
    mutationFn: (documentId: string) => deleteWorkoutHistory(documentId),
    onSuccess: (_, documentId) => {
      queryClient.setQueryData<Workout[]>(
        ["workout-histories", userId],
        (old) => (old ? old.filter((w) => w.documentId !== documentId) : [])
      );
      queryClient.invalidateQueries({
        queryKey: ["workout-histories", userId],
      });
      toast.success("Workout History Deleted successfully");
    },
    onError: () => {
      toast.error("Failed to Delete Workout History");
    },
  });
};
