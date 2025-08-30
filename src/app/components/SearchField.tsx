import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  placeholder: string;
}

const SearchField = ({ setSearchQuery, searchQuery, placeholder }: Props) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mt-4">
      <Ionicons name="search" size={20} color="#687280" />
      <TextInput
        className="flex-1 ml-3 text-gray-800"
        placeholder="Search exercises..."
        placeholderTextColor="#9CA3AF"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Ionicons name="close-circle" size={25} color="#687280" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchField;
