import React from "react";
import { View, Text, ImageBackground, StyleSheet, Dimensions } from "react-native";
import SearchBox from "../SearchFilter/SearchBox";
import FilterBox from "../SearchFilter/FilterBox";
import SearchFilterBox from "../SearchFilter/SearchFilterBox";
import { useServices } from "@/app/context/services/ServicesContext";

// Get device width and height for responsive design
const { width, height } = Dimensions.get("window");

const ServiceHero = () => {
  const { filters } = useServices();

  const backgroundImage = require("@/assets/img/services.jpg");

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Search and Filter */}
        <View style={styles.content}>
          <Text style={styles.title}>Find Your Best Services</Text>
          <SearchFilterBox>
            <SearchBox
              searchType="services"
              placeholder="Search by name or city"
            />
            <FilterBox />
          </SearchFilterBox>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: height * 0.4, // Responsive height based on device size
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.3,
  },
  content: {
    position: "absolute",
    width: "90%",
    alignItems: "center",
    paddingHorizontal: 16, // Add padding for smaller screens
  },
  title: {
    width: "100%",
    fontSize: width < 350 ? 24 : 32, // Responsive font size based on screen width
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
});

export default ServiceHero;
