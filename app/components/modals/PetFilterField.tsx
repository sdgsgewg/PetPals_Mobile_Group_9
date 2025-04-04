import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { usePets } from "@/app/context/pets/PetsContext";
import { Picker } from "@react-native-picker/picker";

const PetFilterField = () => {
  const { species, fetchSpecies, filters, setFilters } = usePets();

  useEffect(() => {
    fetchSpecies();
  }, []);

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setFilters(name, value);
  };

  return (
    <View style={styles.container}>
      {/* Species */}
      <Text style={styles.label}>Species</Text>
      <Picker
        selectedValue={filters.species}
        style={styles.input}
        onValueChange={(itemValue) => handleInputChange("species", itemValue)}
      >
        <Picker.Item label="All" value="" />
        {species.map((speciesItem) => (
          <Picker.Item
            key={speciesItem.speciesId}
            label={speciesItem.name}
            value={speciesItem.name}
          />
        ))}
      </Picker>

      {/* Min Age */}
      <Text style={styles.label}>Min Age</Text>
      <TextInput
        style={styles.input}
        value={filters.minAge}
        onChangeText={(text) => handleInputChange("minAge", text)}
        keyboardType="numeric"
      />

      {/* Max Age */}
      <Text style={styles.label}>Max Age</Text>
      <TextInput
        style={styles.input}
        value={filters.maxAge}
        onChangeText={(text) => handleInputChange("maxAge", text)}
        keyboardType="numeric"
      />

      {/* Min Price */}
      <Text style={styles.label}>Min Price</Text>
      <TextInput
        style={styles.input}
        value={filters.minPrice}
        onChangeText={(text) => handleInputChange("minPrice", text)}
        keyboardType="numeric"
      />

      {/* Max Price */}
      <Text style={styles.label}>Max Price</Text>
      <TextInput
        style={styles.input}
        value={filters.maxPrice}
        onChangeText={(text) => handleInputChange("maxPrice", text)}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
  },
  label: {
    color: "#4B5563", // gray-600
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderColor: "#D1D5DB", // gray-400
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
    color: "#333333", // dark text
    marginBottom: 15,
  },
});

export default PetFilterField;
