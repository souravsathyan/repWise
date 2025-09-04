import axiosInstance from "@/lib/axiosInstance";
import { Exercise } from "@/lib/strapi/exercise";

export const getExercises = async (): Promise<Exercise[] | []> => {
  try {
    const response = await axiosInstance.get("/api/exercises?populate=image");
    return response.status === 200 ? response?.data?.data ?? [] : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getExercise = async (id: string): Promise<Exercise | []> => {
  try {
    const response = await axiosInstance.get(`/api/exercises/?populate=image`, {
      params: { id },
    });
    return response.status === 200 ? response?.data?.data[0] : [];
  } catch (error) {
    console.log(error);
  }
};
