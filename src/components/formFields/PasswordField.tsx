import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  onChangeText: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  value: string;
  placeholder: string;
  label: string;
  error: string; // add error prop
}

const PasswordField = ({
  onChangeText,
  value,
  isLoading,
  label,
  placeholder,
  error,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error ? "border-red-500" : "border-gray-200";
  const labelColor = error ? "text-red-500" : "text-gray-700";
  const inputTextColor = error ? "text-red-500" : "text-gray-900";
  const iconColor = error ? "#EF4444" : "#687280";
  const placeholderColor = error ? "#FCA5A5" : "#9CA3AF";

  return (
    <View className="mb-4">
      <Text className={`text-sm font-medium mb-2 ${labelColor}`}>{label}</Text>
      <View
        className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-4 border ${borderColor}`}
      >
        <Ionicons name="lock-closed-outline" size={20} color={iconColor} />
        <TextInput
          autoCapitalize="none"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          className={`flex-1 ml-3 ${inputTextColor}`}
          editable={!isLoading}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={!showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={iconColor}
          />
        </TouchableOpacity>
      </View>
      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : (
        <Text className="text-xs mt-1 text-gray-500">
          Must be at least 8 characters
        </Text>
      )}
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({});
