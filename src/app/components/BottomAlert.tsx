import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

interface BottomAlertModalProps {
  visible: boolean;
  title: string;
  btnText: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const BottomAlertModal: React.FC<BottomAlertModalProps> = ({
  visible,
  title,
  message,
  onClose,
  onConfirm,
  btnText,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-white rounded-t-2xl p-6 shadow-lg">
        <Text className="text-xl font-bold text-gray-900 mb-2">{title}</Text>
        <Text className="text-gray-600 mb-6">{message}</Text>

        <View className="flex-row justify-end space-x-4 gap-4">
          {/* Cancel */}
          <TouchableOpacity
            onPress={onClose}
            className="px-4 py-2 bg-gray-200 rounded-xl"
          >
            <Text className="text-gray-700 font-medium">Cancel</Text>
          </TouchableOpacity>

          {/* Confirm */}
          {onConfirm && (
            <TouchableOpacity
              onPress={onConfirm}
              className="px-4 py-2 bg-blue-600 rounded-xl"
            >
              <Text className="text-white font-semibold">{btnText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default BottomAlertModal;
