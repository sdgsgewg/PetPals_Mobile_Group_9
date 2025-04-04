import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import SearchBox from "../SearchFilter/SearchBox";
import FilterBox from "../SearchFilter/FilterBox";
import SearchFilterBox from "../SearchFilter/SearchFilterBox";
import { usePets } from "@/app/context/pets/PetsContext";

const PetHero = () => {
  const { filters } = usePets();

  const backgroundImage =
    filters.species === ""
      ? require("@/assets/img/pets.jpg")
      : {
          uri: `@/assets/img/species/${filters.species.toLowerCase()}.jpg`,
        };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground source={backgroundImage} style={styles.imageBackground}>
        {/* Overlay */}
        <View style={styles.overlay} />

        {/* Search and Filter */}
        <View style={styles.content}>
          <Text style={styles.title}>Find Your Best Pals</Text>
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
    height: "50%",
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
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
});

export default PetHero;
