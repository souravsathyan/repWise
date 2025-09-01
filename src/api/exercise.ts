import axiosInstance from "./axiosInstance";
const GET_ALL = "/api/exercises?populate=image";

export const getExercises = async () => {
  try {
    const response = await axiosInstance.get(GET_ALL);
    return response.status === 200 ? response?.data?.data : null;
  } catch (error) {
    console.log(error);
  }
};
