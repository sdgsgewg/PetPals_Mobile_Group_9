import React from "react";
import { View, StyleSheet } from "react-native";

const TransactionWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },
});

export default TransactionWrapper;
