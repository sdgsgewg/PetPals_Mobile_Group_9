import React from "react";
import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";

const TransactionFilter = () => {
  return (
    <View style={styles.container}>
      <FilterButton filterType="All" />
      <FilterButton filterType="Adoption" />
      <FilterButton filterType="Service" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
});

export default TransactionFilter;
