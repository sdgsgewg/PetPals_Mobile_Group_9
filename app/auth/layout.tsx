import React from "react";
import { View, StyleSheet } from "react-native";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 128, // Approximate for pt-32
    paddingBottom: 96, // Approximate for pb-24
  },
});

export default AuthLayout;
