import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator,
  View,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useServices } from "../context/services/ServicesContext";
import BigHeroContent from "../components/ContentTemplate/BigHeroContent";
import FilterModal from "../components/modals/FilterModal";
import ServiceHero from "../components/Services/ServiceHero";
import ServiceList from "../components/Services/ServiceList";
import { useDebounce } from "react-use";
import NormalContent from "../components/ContentTemplate/NormalContent";
import PageNotFound from "../components/PageNotFound";

export default function Services() {
  const { services, filters, fetchServices, loading, error } = useServices();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(filters.searchValue);
    },
    500,
    [filters.searchValue]
  );

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [debouncedSearchTerm]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <BigHeroContent>
      <ServiceHero />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <div className="px-4 sm:px-6 md:px-8 lg:px-12">
          <ServiceList filteredServices={services} />
        </div>
      </ScrollView>
      <FilterModal filterType="services" />
    </BigHeroContent>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  serviceCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
