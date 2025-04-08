import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const TransactionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View style={[styles.container, { maxWidth: screenWidth < 768 ? "100%" : 768 }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
});

export default TransactionWrapper;
