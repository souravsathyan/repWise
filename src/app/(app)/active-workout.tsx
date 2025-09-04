import { View, Platform, StatusBar } from "react-native";
import React, { useState } from "react";
import { useAppStore } from "@/store/store";
import BottomAlertModal from "@/components/BottomAlert";
import { useRouter } from "expo-router";
import ActiveWorkoutHeader from "@/components/activeWorkout/ActiveWorkoutHeader";

const ActiveWorkout = () => {
  const { restWorkout } = useAppStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const endWorkout = () => {
    restWorkout();
    router.back();
  };

  return (
    <View className="flex-1 ">
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <View
        className="bg-gray-800 "
        style={{
          paddingTop: Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
        }}
      >
        <ActiveWorkoutHeader handleOpenModal={handleOpenModal} />
      </View>
      <BottomAlertModal
        message="Do you want to end this workout?"
        title="End Workout"
        visible={open}
        onClose={handleCloseModal}
        onConfirm={endWorkout}
        btnText="End"
      />
    </View>
  );
};

export default ActiveWorkout;
