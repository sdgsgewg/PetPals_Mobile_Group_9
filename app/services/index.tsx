import { StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useServices } from "../context/services/ServicesContext";
import BigHeroContent from "../components/ContentTemplate/BigHeroContent";
import FilterModal from "../components/modals/FilterModal";
import ServiceHero from "../components/Services/ServiceHero";
import ServiceList from "../components/Services/ServiceList";

export default function Services() {
  const { services, filters, fetchServices, loading, error } = useServices();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(filters.searchValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filters.searchValue]);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchServices();
  }, [debouncedSearchTerm]);

  return (
    <BigHeroContent>
      <ServiceHero />
      <ScrollView style={styles.serviceListWrapper}>
        <ServiceList filteredServices={services} />
      </ScrollView>
      <FilterModal filterType="services" />
    </BigHeroContent>
  );
}

const styles = StyleSheet.create({
  serviceListWrapper: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 0,
    marginVertical: 40,
  },
});
