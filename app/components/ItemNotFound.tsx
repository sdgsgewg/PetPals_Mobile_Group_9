import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

interface ItemNotFoundProps {
  image_url: any;
  size: number;
  message: string;
}

const { width } = Dimensions.get("window"); // Get the screen width

const ItemNotFound: React.FC<ItemNotFoundProps> = ({
  image_url,
  size,
  message,
}) => {
  // Dynamically adjust font size based on screen width
  const dynamicFontSize = width > 400 ? 24 : 18; // Adjust font size based on screen width

  return (
    <View style={styles.container}>
      <Image
        source={image_url}
        style={{ width: size, height: size, resizeMode: "contain" }}
      />
      <Text style={[styles.message, { fontSize: dynamicFontSize }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  message: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
});

export default ItemNotFound;
