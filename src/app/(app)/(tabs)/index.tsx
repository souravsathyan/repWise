import EmptyState from "@/components/home/EmptyWorkout";
import GridActions from "@/components/home/GridActions";
import LastWorkoutCard from "@/components/home/LastWorkoutCard";
import QuickActions from "@/components/home/QuickActions";
import StatsCard from "@/components/home/StatsCard";
import { usegetWorkoutHistories } from "@/hooks/useWorkout";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: workouts,
    refetch,
    isPending: loading,
  } = usegetWorkoutHistories(user.id);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">Loading your stats...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <Text className="text-lg text-gray-600">Welcome back, </Text>
          <Text className="text-3xl font-bold text-gray-900">
            {user?.firstName || "Athlete"}!
          </Text>
        </View>
        <StatsCard workouts={workouts} />
        <QuickActions router={router} />
        <GridActions router={router} />
        {workouts?.length ? (
          <LastWorkoutCard
            workout={workouts[workouts.length - 1]}
            router={router}
          />
        ) : (
          <EmptyState router={router} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
