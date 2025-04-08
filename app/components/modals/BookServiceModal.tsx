import { useGlobal } from "@/app/context/GlobalContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface BookServiceProps {
  title: string;
  message: string;
  isModalOpen: boolean;
  onClose: () => void;
}

const BookServiceModal: React.FC<BookServiceProps> = ({
  title,
  message,
  isModalOpen,
  onClose,
}) => {
  const { handleOpenMessageModal } = useGlobal();
  const { loggedInUser } = useUsers();
  const { service, bookService } = useServices();

  const [bookingDate, setBookingDate] = useState<string>("");

  const handleBooking = () => {
    if (!bookingDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Invalid date", "Please enter date in YYYY-MM-DD format.");
      return;
    }

    bookService(
      loggedInUser.userId,
      service.provider.userId,
      service.serviceId,
      bookingDate
    );

    onClose();
    handleOpenMessageModal();
    setBookingDate(""); // reset input
  };

  return (
    <Modal
      visible={isModalOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.modalContainer}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <TextInput
              style={styles.input}
              value={bookingDate}
              onChangeText={setBookingDate}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BookServiceModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    color: "#555",
    marginVertical: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    color: "#000",
    marginTop: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  cancelText: {
    color: "#000",
  },
  bookButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  bookText: {
    color: "#fff",
  },
});
