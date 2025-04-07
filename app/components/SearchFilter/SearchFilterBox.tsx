import React from "react";
import { View, StyleSheet } from "react-native";

const SearchFilterBox = ({ children }: { children: React.ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default SearchFilterBox;
