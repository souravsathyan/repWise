import { View, Text, TouchableOpacity, Linking } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoTutorial = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-gray-800 mb-3">
        Video Tutorial
      </Text>
      <TouchableOpacity
        className="bg-red-500 rounded-xl p-4 flex-row items-center"
        onPress={() => Linking.openURL(videoUrl)}
      >
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
          <Ionicons name="play" size={20} color="#ef4444" />
        </View>
        <View>
          <Text className="text-white font-semibold text-lg">
            Watch Tutorial
          </Text>
          <Text className="text-red-100 text-sm">Learn proper form</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default VideoTutorial;
