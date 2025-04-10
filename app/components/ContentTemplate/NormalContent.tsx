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
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 120,
  },
});

export default NormalContent;
