import BottomAlertModal from "@/components/BottomAlert";
import { usegetWorkoutHistories } from "@/hooks/useWorkout";
import { formatDuration } from "@/lib/helpers";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type SettingOption = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
};

const settingsOptions: SettingOption[] = [
  {
    id: "1",
    title: "Edit Profile",
    icon: "person-outline",
    color: "#3B82F6",
    bg: "bg-blue-100",
  },
  {
    id: "2",
    title: "Notifications",
    icon: "notifications-outline",
    color: "#10B981",
    bg: "bg-green-100",
  },
  {
    id: "3",
    title: "Preferences",
    icon: "settings-outline",
    color: "#8B5CF6",
    bg: "bg-purple-100",
  },
  {
    id: "4",
    title: "Help & Support",
    icon: "help-circle-outline",
    color: "#F59E0B",
    bg: "bg-orange-100",
  },
];

export default function Page() {
  const [open, setOpen] = useState(false);
  const { signOut, userId } = useAuth();
  const { user } = useUser();
  const {
    data: workouts,
    refetch,
    isPending: loading,
  } = usegetWorkoutHistories(userId);
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

  // Calculate stats
  const totalWorkouts = workouts?.length;
  const totalDuration = workouts?.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );
  const averageDuration =
    totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
  // Calculate days since joining (using createdAt from Clerk)
  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceJoining = Math.floor(
    (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const formatJoinDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex flex-1">
      <ScrollView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View
          className="bg-white"
          style={{
            paddingTop:
              Platform.OS === "ios" ? 55 : StatusBar.currentHeight || 0,
          }}
        />
        <View className="px-4 mb-8">
          {/* Header */}
          <View className=" pt-8 pb-6">
            <Text className="text-gray-900 text-3xl font-bold">Profile</Text>
            <Text className="text-lg text-gray-600 mt-1">
              Manage your account and stats
            </Text>
          </View>
          {/* user card */}
          <View className=" mb-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <View className="flex-row items-center mb-4">
                <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mr-4">
                  <Image
                    source={{
                      uri: user.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                    }}
                    className="rounded-full"
                    style={{ width: 64, height: 64 }}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-gray-900">
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.firstName || "User"}
                  </Text>

                  <Text className="text-gray-600">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </Text>

                  <Text className="text-sm text-gray-500 mt-1">
                    Member since {formatJoinDate(joinDate)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* stats */}
          <View className=" mb-6">
            <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Your Fitness Stats
              </Text>
              <View className="flex-row justify-between">
                {/* Total Workouts */}
                <View className="items-center flex-1">
                  <Text className="text-2xl font-bold text-blue-600">
                    {totalWorkouts}
                  </Text>
                  <Text className="text-sm text-gray-600 text-center">
                    Total{"\n"}Workouts
                  </Text>
                </View>

                {/* Total Time */}
                <View className="items-center flex-1">
                  <Text className="text-2xl font-bold text-green-600">
                    {formatDuration(totalDuration)}
                  </Text>
                  <Text className="text-sm text-gray-600 text-center">
                    Total{"\n"}Time
                  </Text>
                </View>

                {/* Days Active */}
                <View className="items-center flex-1">
                  <Text className="text-2xl font-bold text-purple-600">
                    {daysSinceJoining}
                  </Text>
                  <Text className="text-sm text-gray-600 text-center">
                    Days{"\n"}Active
                  </Text>
                </View>
              </View>
              {totalWorkouts > 0 && (
                <View className="mt-4 pt-4 border-t border-gray-100">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-600">
                      Average workout duration:
                    </Text>
                    <Text className="font-semibold text-gray-900">
                      {formatDuration(averageDuration)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
            {settingsOptions.map((option: SettingOption) => {
              return (
                <TouchableOpacity
                  key={option.id}
                  className="flex-row items-center justify-between p-4 border-b border-gray-100"
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-10 h-10  rounded-full items-center justify-center mr-3 ${option.bg}`}
                    >
                      <Ionicons
                        name={option.icon}
                        size={20}
                        color={option.color}
                      />
                    </View>
                    <Text className="text-gray-900 font-medium">
                      {option.title}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#687280" />
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={handleOpenAlert}
            className="bg-red-600 rounded-2xl p-4 shadow-sm mb-6"
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
      </ScrollView>
    </SafeAreaView>
  );
}
