import React from "react";
import { View, StyleSheet } from "react-native";
import FilterButton from "./FilterButton";

const TransactionFilter = () => {
  return (
    <View style={styles.container}>
      <FilterButton filterType="All" isActive={false} />
      <FilterButton filterType="Adoption" isActive={false} />
      <FilterButton filterType="Service" isActive={false} />
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
