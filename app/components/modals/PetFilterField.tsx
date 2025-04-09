import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { usePets } from "@/app/context/pets/PetsContext";
import SelectField from "../FormField/SelectField";
import InputField from "../FormField/InputField";

const PetFilterField = () => {
  const {
    species,
    fetchSpecies,
    filters,
    setFilters,
    petFiltersErrorMessages,
  } = usePets();

  useEffect(() => {
    fetchSpecies();
  }, []);

  // Handle input change
  const handleInputChange = (name: string, value: number | string) => {
    setFilters(name, value);
  };

  return (
    <View style={styles.container}>
      {/* Species */}
      <SelectField
        label="Species"
        name="species"
        value={filters.species}
        onChange={handleInputChange}
        options={species}
        error={petFiltersErrorMessages.Species}
      />

      {/* Min Age */}
      <InputField
        label="Min Age"
        name="minAge"
        type="number"
        placeholder="Enter minimum age"
        value={filters.minAge}
        onChange={handleInputChange}
        error={petFiltersErrorMessages.MinAge}
      />

      {/* Max Age */}
      <InputField
        label="Max Age"
        name="maxAge"
        type="number"
        placeholder="Enter maximum age"
        value={filters.maxAge}
        onChange={handleInputChange}
        error={petFiltersErrorMessages.MaxAge}
      />

      {/* Min Price */}
      <InputField
        label="Min Price"
        name="minPrice"
        type="number"
        placeholder="Enter minimum price"
        value={filters.minPrice}
        onChange={handleInputChange}
        error={petFiltersErrorMessages.MinPrice}
      />

      {/* Max Price */}
      <InputField
        label="Max Price"
        name="maxPrice"
        type="number"
        placeholder="Enter maximum price"
        value={filters.maxPrice}
        onChange={handleInputChange}
        error={petFiltersErrorMessages.MaxPrice}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
  },
  pickerWrapper: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
  },
  picker: {
    color: "#333333",
    backgroundColor: "#FFFFFF",
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
