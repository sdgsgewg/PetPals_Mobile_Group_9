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
        <PageNotFound
          image_url={require("@/assets/img/page-not-found.png")}
          message=""
        />
      </NormalContent>
    );
  }

  return (
    <BigHeroContent>
      <ServiceHero />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.serviceListWrapper}>
          <ServiceList filteredServices={services} />
        </View>
      </ScrollView>
      <FilterModal filterType="services" />
    </BigHeroContent>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginVertical: 40,
  },
  serviceListWrapper: {
    paddingHorizontal: 16,
  },
});
