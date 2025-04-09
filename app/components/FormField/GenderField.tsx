import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface GenderFieldProps {
  value: string;
  onChange: (name: string, value: number | string) => void;
  error?: string;
  isDisabled?: boolean;
}

const GenderField: React.FC<GenderFieldProps> = ({
  value,
  onChange,
  error,
  isDisabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <View style={[styles.pickerContainer, error && styles.errorBorder]}>
        <Picker
          enabled={!isDisabled}
          selectedValue={value}
          onValueChange={(itemValue) => onChange("gender", itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: "#4B5563",
    fontWeight: "600",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#9CA3AF",
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  picker: {
    height: 50,
    color: "#111827",
  },
  errorBorder: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default GenderField;
