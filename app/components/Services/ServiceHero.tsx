import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import SearchBox from "../SearchFilter/SearchBox";
import FilterBox from "../SearchFilter/FilterBox";
import SearchFilterBox from "../SearchFilter/SearchFilterBox";
import { useServices } from "@/app/context/services/ServicesContext";

const ServiceHero = () => {
  const { filters } = useServices();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;

  const backgroundImage = require("@/assets/img/services.jpg");

  return (
    <View style={[styles.container, { height: height * 0.35 }]}>
      {/* Background Image */}
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Search and Filter */}
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: isSmallScreen ? 24 : 30 }]}>
            Find Your Best Services
          </Text>
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
  },
  title: {
    width: "100%",
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
});

export default ServiceHero;
