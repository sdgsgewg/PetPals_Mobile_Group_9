import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { IRole } from "@/app/interface/user/IRole";
import { ISpecies } from "@/app/interface/pet/ISpecies";
import { IServiceCategory } from "@/app/interface/service/IServiceCategory";

interface SelectFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IRole[] | ISpecies[] | IServiceCategory[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={styles.picker}
        >
          <Picker.Item label={`Select a ${label}`} value={0} />
          {options.map((option) => (
            <Picker.Item
              key={
                label === "Role"
                  ? option.roleId
                  : label === "Species"
                  ? option.speciesId
                  : option.categoryId
              }
              label={option.name}
              value={
                label === "Role"
                  ? option.roleId
                  : label === "Species"
                  ? option.speciesId
                  : option.categoryId
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
    marginBottom: 16,
  },
  label: {
    color: "#4B5563",
    fontWeight: "600",
    marginBottom: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  picker: {
    height: 44,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default SelectField;
