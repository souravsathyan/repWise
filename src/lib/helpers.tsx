import { Workout } from "./strapi/workout";

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateCode = (code: string) => {
  const re = /^\d{6}$/; // exactly 6 digits
  return re.test(code);
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500";
    case "Intermediate":
      return "bg-yellow-500";
    case "Advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
export const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "Beginner";
    case "Intermediate":
      return "Intermediate";
    case "Advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

export const getText = (field: any) => {
  if (typeof field === "string") return field;
  if (Array.isArray(field)) {
    return field
      .map((node) => node.children?.map((c: any) => c.text).join(" "))
      .join(" ");
  }
  return "";
};

export const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }
};

export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} s`;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours > 0) {
    if (remainingSeconds > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${hours}h`;
    }
  } else {
    if (remainingSeconds > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
    }
    return `${minutes}m`;
  }
}

export const formatHistoryDate = (dateString?: string) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatHistoryTime = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatWorkoutDuration = (seconds?: number) => {
  if (!seconds) return "Duration not recorded";
  return formatDuration(seconds);
};

export const getTotalSets = (workout: Workout) => {
  console.log({ workout: workout.exercises });
  return (
    workout.exercises?.reduce((total, exercise) => {
      return total + (exercise.sets?.length || 0);
    }, 0) || 0
  );
};

export const getExerciseNames = (workout: Workout) => {
  return workout.exercises?.map((ex) => ex.exercise.name).filter(Boolean) || [];
};
