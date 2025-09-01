import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const ExerciseDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <View className="absolute top-12 left-0 right-0 z-10 px-4 ">
        <TouchableOpacity className="w-10 h-10 bg-black/20 rounded-full  items-center justify-center backdrop-blur-50">
          <Ionicons name={"close"} size={24} color={"bg-white"} />
        </TouchableOpacity>
      </View>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      ></ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({});
