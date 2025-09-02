import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const AuthLogo = () => {
  return (
    <View className="items-center mb-8">
      {/* logo*/}
      <View className="w-18 h-18 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
        <Ionicons name="fitness" size={40} color={"white"} />
      </View>
      <Text className="text-3xl font-bold text-gray-900 mb-2">
        Join RepWise
      </Text>
      <Text className="text-2xl text-gray-600 mb-2 text-center">
        Track Your Fitness Journey{"\n"}And Reach Your Goal
      </Text>
    </View>
  );
};

export default AuthLogo;

const styles = StyleSheet.create({});
