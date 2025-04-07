import React from "react";
import { View, StyleSheet } from "react-native";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f3f4f6", // Equivalent to bg-gray-100
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
});

export default AuthLayout;
