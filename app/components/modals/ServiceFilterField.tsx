import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useServices } from "@/app/context/services/ServicesContext";
import { Picker } from "@react-native-picker/picker";

const ServiceFilterField = () => {
  const { service_categories, fetchServiceCategories, filters, setFilters } =
    useServices();

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setFilters(name, value);
  };

  return (
    <View style={styles.container}>
      {/* Service Category */}
      <Text style={styles.label}>Service Category</Text>
      <Picker
        selectedValue={filters.categoryName}
        style={styles.input}
        onValueChange={(itemValue) =>
          handleInputChange("categoryName", itemValue)
        }
      >
        <Picker.Item label="All" value="" />
        {service_categories.map((service_category) => (
          <Picker.Item
            key={service_category.categoryId}
            label={service_category.name}
            value={service_category.name}
          />
        ))}
      </Picker>

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

export default ServiceFilterField;
