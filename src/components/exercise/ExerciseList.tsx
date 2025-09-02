import { Exercise } from "@/lib/strapi/exercise";

interface Props {
  item: Exercise;
  onPress: () => void;
  showChevron: boolean;
}

import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDifficultyColor, getDifficultyText, getText } from "@/lib/helpers";

const ExerciseList = ({ item, onPress, showChevron }: Props) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row p-6">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden">
          {item.image ? (
            <Image
              source={{ uri: item.image.url }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color={"white"} />
            </View>
          )}
        </View>
        {/* name and description */}
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
              {getText(item.description) || "No description available now."}
            </Text>
          </View>
          {/* difficulty level */}
          <View className="flex-row items-center justify-between">
            <View
              className={`px-3 py-1 rounded-full ${getDifficultyColor(
                item.difficultyLevel
              )}`}
            >
              <Text className="text-sm font-semibold text-white">
                {getDifficultyText(item.difficultyLevel)}
              </Text>
            </View>
            {/* chevron */}
            {showChevron && (
              <TouchableOpacity className="p-2">
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseList;
