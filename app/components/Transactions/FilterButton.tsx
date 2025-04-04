import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface FilterButtonProps {
  filterType: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterType }) => {
  const { setTransactionType } = useTransactions();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => setTransactionType(filterType)}
    >
      <Text style={styles.text}>{filterType}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D1D5DB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FilterButton;
