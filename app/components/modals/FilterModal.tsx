import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useGlobal } from "@/app/context/GlobalContext";
import PetFilterField from "./PetFilterField";
import ServiceFilterField from "./ServiceFilterField";

interface FilterModalProps {
  filterType: string;
}

const FilterModal: React.FC<FilterModalProps> = ({ filterType }) => {
  const { isFilterModalOpen, handleCloseFilterModal } = useGlobal();
  const petContext = usePets();
  const serviceContext = useServices();

  const isPetsFilter = filterType === "pets";
  const fetchFunction = isPetsFilter
    ? petContext.fetchPets
    : serviceContext.fetchServices;

  const handleReset = () => {
    if (filterType === "pets") {
      const { resetFilters } = petContext;
      resetFilters();
    } else {
      const { resetFilters } = serviceContext;
      resetFilters();
    }
  };

  return (
    <Modal
      visible={isFilterModalOpen}
      transparent
      animationType="slide"
      onRequestClose={handleCloseFilterModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Filter</Text>
            <TouchableOpacity
              onPress={handleCloseFilterModal}
              style={styles.closeButton}
            >
              <X size={28} color="#808080" />
            </TouchableOpacity>
          </View>

          {filterType === "pets" ? <PetFilterField /> : <ServiceFilterField />}

          {/* Filter Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                fetchFunction();
                handleCloseFilterModal();
              }}
            >
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 400,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "#bbb",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FilterModal;
