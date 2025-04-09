import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface Option {
  id: number;
  name: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (name: string, value: string | number) => void;
  options: Option[];
  error?: string;
  isDisabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  isDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.pickerWrapper,
          isDisabled && styles.disabled,
          error && styles.errorBorder,
        ]}
      >
        <Picker
          selectedValue={value}
          enabled={!isDisabled}
          style={[styles.picker, isDisabled && styles.disabledText]}
          onValueChange={(itemValue) => onChange(name, itemValue)}
          dropdownIconColor={Platform.OS === "android" ? "#6B7280" : undefined} // Optional: icon color for Android
        >
          <Picker.Item
            label={
              name === "species" || name === "categoryName"
                ? "All"
                : `Select a ${label}`
            }
            value={name === "species" || name === "categoryName" ? "" : "0"}
          />
          {options.map((option) => (
            <Picker.Item
              key={option.id}
              label={option.name}
              value={
                name === "species" || name === "categoryName"
                  ? option.name
                  : option.id
              }
            />
          ))}
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    color: "#4B5563", // gray-600
    fontWeight: "600",
    marginBottom: 5,
  },
  pickerWrapper: {
    borderColor: "#D1D5DB",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  picker: {
    color: "#111827", // gray-900
    backgroundColor: "#FFFFFF",
  },
  disabled: {
    backgroundColor: "#F3F4F6", // gray-100
    borderColor: "#D1D5DB",
  },
  disabledText: {
    color: "#9CA3AF", // gray-400
  },
  errorBorder: {
    borderColor: "#EF4444", // red-500
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default SelectField;
