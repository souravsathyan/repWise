import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { useAppStore } from "@/store/store";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchField from "../SearchField";
import ExerciseList from "../exercise/ExerciseList";
import { useGetExercises } from "@/hooks/useExercies";
import { Exercise } from "@/lib/strapi/exercise";

const ExerciseSelectionModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { addExerciseToWorkout } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
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
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleExercisePress = (exercise: Exercise) => {
    // Directly add exercise to workout
    addExerciseToWorkout({ name: exercise.name, id: exercise.id });
    onClose();
  };
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      style={{ margin: 0 }}
    >
      <SafeAreaView className="flex-1 bg-white rounded-xl">
        <StatusBar barStyle="light-content" />
        <View className="bg-white pt-4 px-4 pb-2 shadow-sm border-b border-gray-100 rounded-xl">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold ☐ text-gray-800">
              Add Exercise
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-600 mb-1">
            Tap any exercise to add it to your workout
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
              onPress={() => handleExercisePress(item)}
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
    </Modal>
  );
};

export default ExerciseSelectionModal;

const styles = StyleSheet.create({});
