import { usegetWorkoutHistories } from "@/hooks/useWorkout";
import { useAuth } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import WorkoutItem from "@/components/workout/WorkoutItem";

export default function HistoryScreen() {
  const { userId } = useAuth();
  const {
    data: workouts,
    refetch,
    isPending: loading,
  } = usegetWorkoutHistories(userId);
  const [refreshing, setRefreshing] = useState(false);
  const refresh = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (refresh && refresh.refresh === "true") {
      refetch();
      router.replace("/(app)/(tab)/history");
    }
  }, [refresh, refetch, router]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 py-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Workout History
          </Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3882F6" />
          <Text className="text-gray-600 mt-4">Loading your workouts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-50">
      <StatusBar style="dark" backgroundColor="#fff" />
      <View className="py-4 px-6 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Workout History
        </Text>
        <Text className="text-gray-600 mt-1">
          {workouts.length} workout{workouts.length > 1 ? "s" : ""} completed
        </Text>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              No workouts yet
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Your completed workouts will appear here
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <WorkoutItem workout={item} router={router} />
        )}
      />
    </SafeAreaView>
  );
}
