import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  options: { label: string; value: string | number }[];
  error: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Picker
        selectedValue={String(value)}
        onValueChange={(itemValue) => onChange(itemValue)} 
        style={styles.picker}
      >
        <Picker.Item label="Select an option..." value="" />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label.toString()}
            value={String(option.value)}
          />
        ))}
      </Picker>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default SelectField;
