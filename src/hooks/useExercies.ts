import { getExercise, getExercises } from "@/services/exercise";
import { Exercise } from "@/lib/strapi/exercise";
import { useQuery } from "@tanstack/react-query";

export const useGetExercises = () => {
  return useQuery<Exercise[], Error>({
    queryKey: ["exercises"],
    queryFn: getExercises,
    staleTime: 1000 * 60 * 30,
  });
};

export const useGetExercise = (id: string) => {
  return useQuery<Exercise | [], Error>({
    queryKey: ["exercise", id],
    queryFn: () => getExercise(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });
};
