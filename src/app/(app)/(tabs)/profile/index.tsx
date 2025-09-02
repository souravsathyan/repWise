import BottomAlertModal from "@/components/BottomAlert";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  const [open, setOpen] = useState(false);
  const { signOut } = useAuth();
  const handleCloseAlert = () => {
    setOpen(false);
  };
  const handleOpenAlert = () => {
    setOpen(true);
  };
  const onConfirm = () => {
    signOut();
    handleCloseAlert();
  };
  return (
    <SafeAreaView className="flex flex-1">
      <View className="px-6 mb-8">
        <TouchableOpacity
          onPress={handleOpenAlert}
          className="bg-red-600 rounded-2xl p-4 shadow-sm"
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color={"white"} />
            <Text className="text-white font-semibold text-lg ml-2">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomAlertModal
        message="Do you want to sign out"
        title="Sign Out"
        visible={open}
        onClose={handleCloseAlert}
        onConfirm={onConfirm}
        btnText="Sign Out"
      />
    </SafeAreaView>
  );
}
