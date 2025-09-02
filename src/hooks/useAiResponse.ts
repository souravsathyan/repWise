import { useMutation } from "@tanstack/react-query";

interface AiResponse {
  message: string;
}

interface AiVariables {
  exerciseName: string;
}

export const useAiResponse = (
  onSucces: (data: AiResponse) => void,
  onError: () => void
) => {
  return useMutation<AiResponse, Error, AiVariables>({
    mutationFn: async ({ exerciseName }) => {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseName }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI Guidance");
      const data = await response.json();
      return data;
    },

    onSuccess: onSucces,
    onError: onError,
  });
};
