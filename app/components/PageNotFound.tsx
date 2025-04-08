import React from "react";
import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

interface PageNotFoundProps {
  image_url: any;
  message: string;
}

const { width } = Dimensions.get("window"); // Get screen width for responsiveness

const PageNotFound: React.FC<PageNotFoundProps> = ({ image_url, message }) => {
  // Dynamically adjust font size based on screen width
  const dynamicFontSize = width > 400 ? 20 : 16; // Adjust font size for smaller screens

  return (
    <View style={styles.container}>
      <Image
        source={image_url}
        style={[styles.image, { width: width * 0.8, height: width * 0.8 }]} // Use responsive width/height
      />
      <Text style={[styles.message, { fontSize: dynamicFontSize }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // Added padding to prevent text/image from touching screen edges
  },
  image: {
    resizeMode: "contain",
  },
  message: {
    color: "#94a3b8",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PageNotFound;
