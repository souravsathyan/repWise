import {
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchField from "@/components/SearchField";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Exercise } from "@/lib/strapi/exercise";
import ExerciseList from "@/components/exercise/ExerciseList";
import { useRouter } from "expo-router";
import { useGetExercises } from "@/hooks/useExercies";
// import { client } from "@/lib/sanity/client";
// import { Exercise } from "@/lib/sanity/types";

const Exercises = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [refreshing, setRefresh] = React.useState(false);
  const router = useRouter();
  const { data: exercises, isLoading, refetch } = useGetExercises();
  const [filteredExercises, setFilteredExercises] = React.useState<Exercise[]>(
    []
  );

  useEffect(() => {
    if (exercises) {
      const filtered = exercises.filter((exercise: Exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExercises(filtered);
    }
  }, [searchQuery, exercises]);

  const onRefresh = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor={"#fff"} />
      <View className="py-4 px-6 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Exercise Library
        </Text>
        <Text className="text-gray-600 mt-1">
          Discover and master new exercises
        </Text>
        <SearchField
          placeholder="Search Exercises"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-6"
        renderItem={({ item }) => (
          <ExerciseList
            item={item}
            onPress={() => router.push(`/exercise-detail?id=${item.id}`)}
            showChevron
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
            title="Pull to refresh exercises"
            titleColor="#6B7280"
          />
        }
        ListEmptyComponent={
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="fitness-outline" size={64} color="#9CA3AF" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              {searchQuery
                ? "No exercises found"
                : isLoading
                ? "Loading exercises..."
                : "No exercise found"}
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              {searchQuery
                ? "Try adjusting your search"
                : isLoading
                ? "Your exercises will appear here"
                : "No exercise found"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Exercises;

const styles = StyleSheet.create({});
