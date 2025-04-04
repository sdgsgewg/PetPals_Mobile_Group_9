import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Pastikan menggunakan react-native-vector-icons
import { useGlobal } from "@/app/context/GlobalContext";

const FilterBox = () => {
  const { handleOpenFilterModal } = useGlobal();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleOpenFilterModal}>
        <FontAwesome name="filter" size={20} color="#4A5568" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    marginTop: 12,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#CBD5E0", // gray-300
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default FilterBox;
