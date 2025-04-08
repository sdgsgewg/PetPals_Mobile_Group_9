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
import { usePets } from "@/app/context/pets/PetsContext";

const PetHero = () => {
  const { filters } = usePets();
  const { width, height } = useWindowDimensions();
  const isSmallScreen = width < 360;

  // Preloaded static species image map (Expo compatible)
  const speciesImages: Record<string, any> = {
    dog: require("@/assets/img/species/dog.jpg"),
    cat: require("@/assets/img/species/cat.jpg"),
    rabbit: require("@/assets/img/species/rabbit.jpg"),
    bird: require("@/assets/img/species/bird.jpg"),
    // Add more species here if needed
  };

  const backgroundImage =
    filters.species && speciesImages[filters.species.toLowerCase()]
      ? speciesImages[filters.species.toLowerCase()]
      : require("@/assets/img/pets.jpg");

  return (
    <View style={[styles.container, { height: height * 0.35 }]}>
      {/* Background Image */}
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Search and Filter */}
        <View style={styles.content}>
          <Text style={[styles.title, { fontSize: isSmallScreen ? 24 : 32 }]}>
            Find Your Best Pals
          </Text>
          <SearchFilterBox>
            <SearchBox
              searchType="pets"
              placeholder="Search by name or breed"
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

export default PetHero;
