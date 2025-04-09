import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface DataFieldProps {
  label: string;
  value: string | number;
}

const DataField: React.FC<DataFieldProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff", // light mode background
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb", // gray-200
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#111827", // dark gray
  },
  value: {
    flex: 2,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default DataField;
