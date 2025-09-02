import { Exercise } from "@/lib/strapi/exercise";
import axiosInstance from "./axiosInstance";

export const getExercises = async (): Promise<Exercise[] | null> => {
  try {
    const response = await axiosInstance.get("/api/exercises?populate=image");
    return response.status === 200 ? response?.data?.data : null;
  } catch (error) {
    console.log(error);
  }
};

export const getExercise = async (id: string): Promise<Exercise | null> => {
  try {
    const response = await axiosInstance.get(`/api/exercises/?populate=image`, {
      params: { id },
    });
    return response.status === 200 ? response?.data?.data[0] : null;
  } catch (error) {
    console.log(error);
  }
};
