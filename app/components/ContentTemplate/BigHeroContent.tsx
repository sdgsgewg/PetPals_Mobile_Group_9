import React from "react";
import { View, StyleSheet } from "react-native";

const BigHeroContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
  },
});

export default BigHeroContent;
