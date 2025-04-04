import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface ItemNotFoundProps {
  image_url: any;
  size: number;
  message: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({
  image_url,
  size,
  message,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={image_url}
        style={{ width: size, height: size, resizeMode: "contain" }}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default ItemNotFound;
