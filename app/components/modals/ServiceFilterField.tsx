import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useServices } from "@/app/context/services/ServicesContext";
import SelectField from "../FormField/SelectField";
import InputField from "../FormField/InputField";

const ServiceFilterField = () => {
  const {
    service_categories,
    fetchServiceCategories,
    filters,
    setFilters,
    serviceFiltersErrorMessages,
  } = useServices();

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  // Handle input change
  const handleInputChange = (name: string, value: number | string) => {
    setFilters(name, value);
  };

  return (
    <View style={styles.container}>
      {/* Service Category */}
      <SelectField
        label="Service Category"
        name="categoryName"
        value={filters.categoryName}
        onChange={handleInputChange}
        options={service_categories}
        error={serviceFiltersErrorMessages.CategoryName}
      />

      {/* Min Price */}
      <InputField
        label="Min Price"
        type="number"
        name="minPrice"
        placeholder="Minimum Price"
        value={filters.minPrice}
        onChange={handleInputChange}
        error={serviceFiltersErrorMessages.MinPrice}
      />

      {/* Max Price */}
      <InputField
        label="Max Price"
        type="number"
        name="maxPrice"
        placeholder="Maximum Price"
        value={filters.maxPrice}
        onChange={handleInputChange}
        error={serviceFiltersErrorMessages.MaxPrice}
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

export default ServiceFilterField;
