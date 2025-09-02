import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { getDifficultyColor, getDifficultyText, getText } from "@/lib/helpers";
import { useGetExercise } from "@/hooks/useExercies";
import { useAiResponse } from "@/hooks/useAiResponse";
import Markdown from "react-native-markdown-display";
import AiGuidence from "@/components/exercise/AiGuidence";
import VideoTutorial from "@/components/exercise/VideoTutorial";

const ExerciseDetails = ({ item }) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [aiGuidance, setAiGuidance] = useState<string>("");
  const router = useRouter();
  const { data: exercise, isLoading: loading, error } = useGetExercise(id);
  const { mutate: getAiAssistance, isPending: aiLoading } = useAiResponse(
    (data) => setAiGuidance(data.message),
    () => setAiGuidance("Error Occured please try again after sometime")
  );

  const handleAi = async () => {
    if (!exercise) return;
    console.log("handling the ai request");
    getAiAssistance({ exerciseName: exercise.name });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="text-gray-500">Loading exercise...</Text>
        </View>
      </SafeAreaView>
    );
  }
  const handleGoBack = () => {
    router.back();
  };

  if (!exercise || error) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Exercise not found: {id}</Text>
          <TouchableOpacity
            onPress={handleGoBack}
            className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      {Platform.OS === "ios" && (
        <View className="absolute top-12 left-0 right-0 z-10 px-4 ">
          <TouchableOpacity className="w-10 h-10 bg-black/20 rounded-full  items-center justify-center backdrop-blur-50">
            <Ionicons name={"close"} size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      )}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="h-80 bg-white relative">
          {exercise?.image ? (
            <Image
              source={{ uri: exercise.image.url }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color={"white"} />
            </View>
          )}
        </View>
        <View className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        <View className="px-6 py-6">
          <View className="items-center justify-between flex-row mb-4">
            <View className="flex-1 mr-4">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                {exercise?.name}
              </Text>
              <View
                className={`self-start px-4 py-2 rounded-full ${getDifficultyColor(
                  exercise?.difficultyLevel
                )}`}
              >
                <Text>{getDifficultyText(exercise?.difficultyLevel)}</Text>
              </View>
            </View>
          </View>
          {/* description */}
          <View className="mb-6">
            <Text className="text-xl font-semibold text-gray-800 mb-3">
              Description
            </Text>
            <Text className="leading-6 text-base text-gray-600 ">
              {getText(exercise?.description)}
            </Text>
          </View>
          {/* video */}
          {exercise?.videoUrl && (
            <VideoTutorial videoUrl={exercise?.videoUrl} />
          )}

          {(aiGuidance || aiLoading) && (
            <AiGuidence aiGuidance={aiGuidance} aiLoading={aiLoading} />
          )}

          {/* Action btns */}
          <View className="mt-8 gap-2">
            <TouchableOpacity
              className={`rounded-xl py-4 items-center ${
                aiLoading
                  ? "bg-gray-400"
                  : aiGuidance
                  ? "bg-green-500"
                  : "bg-blue-500"
              }`}
              disabled={aiLoading}
              onPress={handleAi}
            >
              {aiLoading ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-bold text-lg ml-2">
                    Loading...
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-bold text-lg">
                  {aiGuidance
                    ? "Refresh AI Guidance"
                    : "Get AI Guidance on Form & Technique"}
                </Text>
              )}
            </TouchableOpacity>
            {/* back button */}

            <TouchableOpacity
              className="bg-gray-200 rounded-xl py-4 items-center"
              onPress={() => router.back()}
            >
              <Text className="text-gray-800 font-bold text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({});
