import { useGlobal } from "@/app/context/GlobalContext";
import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MessageModalProps {
  title: string;
  message: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ title, message }) => {
  const { isMessageModalOpen, handleCloseMessageModal } = useGlobal();

  return (
    <Modal
      visible={isMessageModalOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCloseMessageModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            onPress={handleCloseMessageModal}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Background overlay with transparency
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#cccccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MessageModal;
