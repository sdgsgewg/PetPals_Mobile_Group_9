import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

// Get device width for responsiveness
const { width } = Dimensions.get("window");

const SearchFilterBox = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400, // Limits the width on large screens like tablets
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: width * 0.04, // 4% of the device width for padding
    paddingVertical: 16,
    marginHorizontal: width * 0.05, // Ensures some space from sides
  },
});

export default SearchFilterBox;
