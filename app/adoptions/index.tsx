"use client";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDebounce } from "react-use";

import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import FilterModal from "../components/modals/FilterModal";
import { usePets } from "@/app/context/pets/PetsContext";
import { ScrollView } from "react-native";

const Adoptions = () => {
  const { pets, filters, fetchPets, error } = usePets();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(filters.searchValue);
    },
    500,
    [filters.searchValue]
  );

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    fetchPets();
  }, [debouncedSearchTerm]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound
          image_url={require("@/assets/img/page-not-found.png")}
          message="Pet not found"
        />
      </NormalContent>
    );
  }

  return (
    <BigHeroContent>
      <PetHero />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.petListWrapper}>
          <PetList filteredPets={pets} />
        </View>
      </ScrollView>
      <FilterModal filterType="pets" />
    </BigHeroContent>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginVertical: 40,
  },
  petListWrapper: {
    paddingHorizontal: 16, // Equivalent to px-4
  },
});

export default Adoptions;
