import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 20,
    color: "#4B5563",
  },
});

export default Loading;
