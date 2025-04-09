import React from "react";
import { View, StyleSheet } from "react-native";

const NormalContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
    paddingHorizontal: 16, // Default padding, can be adjusted for breakpoints
    paddingTop: 50, // Approximate for pt-32
    paddingBottom: 150, // Approximate for pb-24
  },
});

export default NormalContent;
