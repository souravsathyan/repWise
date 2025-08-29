import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  emailAddress: string;
  isLoading: boolean;
  value: string;
  error: string;
  onChangeText: Dispatch<SetStateAction<string>>;
  onVerify: () => Promise<void>;
}

const VerificationScreen = ({
  emailAddress,
  isLoading,
  value,
  onChangeText,
  onVerify,
  error,
}: Props) => (
  <SafeAreaView className="flex-1 bg-gray-50">
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 p-6">
        <View className="flex-1 justify-center ">
          <View className="items-center">
            {/* logo*/}
            <View className="w-18 h-18 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Feather name="mail" size={40} color="black" />
            </View>
            {/* form */}

            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Check Your Mail
            </Text>
            <Text className="text-2xl text-gray-600 mb-2 text-center">
              We have sent a verification code to{"\n"}
              {emailAddress}
            </Text>
          </View>
          {/* form */}
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <Text className="text-2xl mb-6 text-center font-bold text-gray-900">
              Enter Verification Code
            </Text>
            {/* Code Input */}
            <View className="mb-6">
              <Text
                className={`text-sm font-medium mb-2 ${
                  error ? "text-red-500" : "text-gray-700"
                }`}
              >
                Verification Code
              </Text>

              {/* Input */}
              <View
                className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border ${
                  error ? "border-red-500" : "border-gray-200"
                }`}
              >
                <Ionicons
                  name="key-outline"
                  size={20}
                  color={error ? "#EF4444" : "#687280"}
                />
                <TextInput
                  value={value}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor={error ? "#FCA5A5" : "#9CA3AF"}
                  onChangeText={onChangeText}
                  className={`flex-1 ml-3 text-center text-lg tracking-widest ${
                    error ? "text-red-500" : "text-gray-900"
                  }`}
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!isLoading}
                />
              </View>

              {/* Error message */}
              {error && (
                <Text className="text-red-500 text-sm mt-1">{error}</Text>
              )}
              <TouchableOpacity
                onPress={onVerify}
                disabled={isLoading}
                className={`rounded-xl py-4 shadow-sm mt-4 mb-6 ${
                  isLoading ? "bg-gray-400" : "bg-green-600"
                }`}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-center">
                  {isLoading ? (
                    <Ionicons name="refresh" size={20} color={"white"} />
                  ) : (
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={20}
                      color={"white"}
                    />
                  )}
                  <Text className="text-white font-semibold text-lg ml-2 ">
                    {isLoading ? " Verifying..." : "Verify"}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Resend Code */}
              <TouchableOpacity className="py-2">
                <Text className="text-blue-600 font-medium text-center">
                  Didn't receive the code? Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="pb-6 text-gray-500 text-sm flex-row justify-center">
          <Text className="text-center">Almost there! Just one more step</Text>
          <Ionicons name="heart" size={24} color="pink" />
        </View>
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default VerificationScreen;

const styles = StyleSheet.create({});
