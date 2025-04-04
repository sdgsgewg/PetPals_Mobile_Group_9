import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface PageNotFoundProps {
  image_url: string;
  message: string;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({ image_url, message }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image_url }} style={styles.image} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  message: {
    fontSize: 20,
    color: "#94a3b8",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PageNotFound;
