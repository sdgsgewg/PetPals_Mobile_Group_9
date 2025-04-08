import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

interface FilterButtonProps {
  filterType: string;
  isActive: boolean; // Add an `isActive` prop to indicate the current filter
}

const FilterButton: React.FC<FilterButtonProps> = ({ filterType, isActive }) => {
  const { setTransactionType } = useTransactions();

  return (
    <TouchableOpacity
      style={[styles.button, isActive && styles.activeButton]} // Apply active button styles when selected
      onPress={() => setTransactionType(filterType)}
    >
      <Text style={[styles.text, isActive && styles.activeText]}>{filterType}</Text>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");
const isSmallScreen = width < 350; // Define a breakpoint for small screens

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D1D5DB",
    paddingVertical: isSmallScreen ? 6 : 8, // Adjust padding based on screen size
    paddingHorizontal: isSmallScreen ? 12 : 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    backgroundColor: "#3B82F6", // Active button color
  },
  text: {
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  activeText: {
    color: "white", // Change text color when active
  },
});

export default FilterButton;
