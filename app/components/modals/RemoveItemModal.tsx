import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useUsers } from "@/app/context/users/UsersContext";
import IPet from "@/app/interface/pet/IPet";
import IService from "@/app/interface/service/IService";

interface RemoveItemModalProps {
  title: string;
  message: string;
  item: IPet | IService;
  itemType: string;
}

const RemoveItemModal: React.FC<RemoveItemModalProps> = ({
  title,
  message,
  item,
  itemType,
}) => {
  const { formattedPrice, isRemoveItemModalOpen, handleCloseRemoveItemModal } =
    useGlobal();
  const { loggedInUser } = useUsers();
  const petsContext = usePets();
  const servicesContext = useServices();

  const handleRemoveItem = async () => {
    const isPet = itemType.toLowerCase() === "pet";
    const removeFunction = isPet
      ? petsContext.removePet
      : servicesContext.removeService;

    const idToRemove =
      isPet && petsContext.isIPet(item)
        ? item.petId
        : servicesContext.isIService(item)
        ? item.serviceId
        : 0;

    await removeFunction(idToRemove);

    const fetchFunction = isPet
      ? petsContext.fetchOwnerPets
      : servicesContext.fetchProviderServices;

    fetchFunction(loggedInUser.userId);
    handleCloseRemoveItemModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isRemoveItemModalOpen}
      onRequestClose={handleCloseRemoveItemModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          {/* Item Details */}
          <View style={styles.itemDetails}>
            <Text style={styles.sectionTitle}>{`${itemType} Detail`}</Text>
            <Text style={styles.detailText}>{`Name: ${item.name}`}</Text>
            <Text style={styles.detailText}>
              {`Price: Rp ${formattedPrice(item.price)}`}
            </Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleCloseRemoveItemModal}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleRemoveItem}
              style={[styles.button, styles.removeButton]}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RemoveItemModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 10,
    width: "85%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    marginTop: 8,
    color: "#666",
  },
  itemDetails: {
    marginTop: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#444",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  cancelText: {
    color: "#000",
  },
  removeButton: {
    backgroundColor: "#dc2626",
  },
  removeText: {
    color: "#fff",
  },
});
