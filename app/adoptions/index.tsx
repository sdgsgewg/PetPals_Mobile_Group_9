"use client";
import PetHero from "@/app/components/Adoptions/PetHero";
import PetList from "@/app/components/Adoptions/PetList";
import BigHeroContent from "@/app/components/ContentTemplate/BigHeroContent";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import { usePets } from "@/app/context/pets/PetsContext";
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import FilterModal from "../components/modals/FilterModal";
import { ScrollView } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

const Adoptions = () => {
  const { pets, filters, fetchPets, error } = usePets();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the searchValue so that it updates after 500ms of inactivity
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
          image_url="/img/page-not-found.png"
          message="Pet not found"
        />
      </NormalContent>
    );
  }

  return (
    <BigHeroContent>
      <PetHero />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <div className="px-4 sm:px-6 md:px-8 lg:px-12">
          <PetList filteredPets={pets} />
        </div>
      </ScrollView>
      <FilterModal filterType="pets" />
    </BigHeroContent>
  );
};

export default Adoptions;
