import { RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchField from "@/app/components/SearchField";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { defineQuery } from "groq";
// import { client } from "@/lib/sanity/client";
// import { Exercise } from "@/lib/sanity/types";

const exercisesQuery = defineQuery(`*[_type=="exercise"]{...}`);

const Exercises = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [refreshing, setRefresh] = React.useState(false);
  const [exercises, setExercises] = React.useState([]);

  const [filteredExercises, setFilteredExercises] = React.useState([]);

  const fetchExercises = async () => {
    try {
      // const exercises = await client.fetch(exercisesQuery);

      setExercises([]);
      setFilteredExercises([]);
    } catch (e) {}
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const onRefresh = () => {};
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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
        <FlatList
          data={[]}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="p-10"
          renderItem={({ item }) => {
            return <></>;
          }}
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
                {searchQuery ? "No exercises found" : "Loading exercises..."}
              </Text>
              <Text className="text-gray-600 text-center mt-2">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Your exercises will appear here"}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Exercises;

const styles = StyleSheet.create({});
