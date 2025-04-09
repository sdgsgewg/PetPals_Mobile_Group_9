"use client";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import FilterModal from "../components/modals/FilterModal";
import { usePets } from "@/app/context/pets/PetsContext";

const Adoptions = () => {
  const { pets, filters, fetchPets, error } = usePets();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(
    filters.searchValue
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.searchValue]);

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    fetchPets();
  }, [debouncedSearchTerm]);

  return (
    <BigHeroContent>
      <PetHero />
      <ScrollView style={styles.petListWrapper}>
        <PetList filteredPets={pets} />
      </ScrollView>
      <FilterModal filterType="pets" />
    </BigHeroContent>
  );
};

const styles = StyleSheet.create({
  petListWrapper: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 0,
    marginVertical: 40,
  },
});

export default Adoptions;
