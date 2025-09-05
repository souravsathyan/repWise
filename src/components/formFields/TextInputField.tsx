import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface Props {
  onChangeText: (text: string) => void;
  isLoading: boolean;
  value: string;
  placeholder: string;
  label: string;
  error?: string;
  keyboardType: KeyboardTypeOptions;
  hideIcon: boolean;
  showWeight?: boolean;
  weightUnit?: string;
  inputPadding?: string;
}

const TextInputField = ({
  onChangeText,
  value,
  isLoading,
  label,
  placeholder,
  error,
  keyboardType,
  hideIcon,
  showWeight,
  weightUnit,
  inputPadding = "px-4 py-4",
}: Props) => {
  const borderColor = error ? "border-red-500" : "border-gray-200";
  const labelColor = error ? "text-red-500" : "text-gray-700";
  const inputTextColor = error ? "text-red-500" : "text-gray-900";

  return (
    <View className="mb-4">
      <Text className={`text-sm font-medium mb-2 ${labelColor}`}>{label}</Text>
      <View
        className={`flex-row items-center bg-gray-50 rounded-xl  border ${borderColor} ${inputPadding}`}
      >
        {!hideIcon && (
          <Ionicons
            name="mail-outline"
            size={20}
            color={error ? "#EF4444" : "#687280"} // red if error
          />
        )}
        <TextInput
          autoCapitalize="none"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={error ? "#FCA5A5" : "#9CA3AF"} // lighter red if error
          onChangeText={onChangeText}
          className={`flex-1 ml-3 ${inputTextColor}`}
          editable={isLoading}
          keyboardType={keyboardType || "default"}
        />
        {showWeight && (
          <MaterialCommunityIcons
            name={weightUnit === "kg" ? "weight-gram" : "weight-pound"}
            size={24}
            color={"#687280"}
          />
        )}
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({});
