import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Markdown from "react-native-markdown-display";

interface Props {
  aiGuidance: string;
  aiLoading: boolean;
}

const AiGuidence = ({ aiGuidance, aiLoading }: Props) => {
  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-3">
        <Ionicons name="fitness" size={24} color={"#3B82F6"} />
        <Text className="text-xl font-semibold text-gray-800 ml-2">
          AI coach says
        </Text>
      </View>
      {aiLoading ? (
        <View className="bg-gray-50 rounded-xl p-4 items-center">
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text className="text-gray-600 mt-2">
            Getting personalized guidance...
          </Text>
        </View>
      ) : (
        <View className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
          <Markdown
            style={{
              body: { paddingBottom: 20 },
              heading2: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#1f2937",
                marginTop: 12,
                marginBottom: 6,
              },
              heading3: {
                fontSize: 16,
                fontWeight: "600",
                color: "#374151",
                marginTop: 8,
                marginBottom: 4,
              },
            }}
          >
            {aiGuidance}
          </Markdown>
        </View>
      )}
    </View>
  );
};

export default AiGuidence;
