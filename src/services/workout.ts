import axiosInstance from "@/lib/axiosInstance";
import { Workout } from "@/lib/strapi/workout";

export const getWorkoutHistories = async (
  userId: string
): Promise<Workout[] | null> => {
  try {
    const response = await axiosInstance.get(
      `/api/workouts?filters[userId][$eq]=${userId}&populate[exercises][populate]=*`
    );
    return response.status === 200 ? response?.data?.data : null;
  } catch (error) {
    console.log(error);
  }
};

export const getWorkoutHistory = async (
  workoutId: string,
  userId: string
): Promise<Workout | null> => {
  try {
    const response = await axiosInstance.get(
      `/api/workouts?filters[userId][$eq]=${userId}&filters[id][$eq]=${workoutId}&populate[exercises][populate]=*`
    );
    return response.status === 200 ? response?.data?.data[0] : null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteWorkoutHistory = async (documentId: string) => {
  try {
    console.log("CALLING DEL API");
    const deleteResponse = await axiosInstance.delete(
      `/api/workouts/${documentId}`
    );
    console.log({ deleteResponse });
    return deleteResponse.status === 204 ? deleteResponse.data : null;
  } catch (error) {
    console.error("Error deleting workout:", error);
    return null;
  }
};
