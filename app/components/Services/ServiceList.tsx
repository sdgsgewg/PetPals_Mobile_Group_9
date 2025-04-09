import React from "react";
import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import IService from "@/app/interface/service/IService";
import ServiceCard from "./ServiceCard";
import { useServices } from "@/app/context/services/ServicesContext";
import ItemNotFound from "../ItemNotFound";
import Loading from "../Loading";

interface ServiceListProps {
  filteredServices: IService[];
}

const ServiceList: React.FC<ServiceListProps> = ({ filteredServices }) => {
  const { loading } = useServices();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  if (loading) return <Loading />;

  return (
    <>
      {filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardWrapper,
                {
                  marginRight: isSmallScreen ? 0 : 8,
                },
              ]}
            >
              <ServiceCard service={item} />
            </View>
          )}
          numColumns={isSmallScreen ? 1 : 2}
          columnWrapperStyle={isSmallScreen ? undefined : styles.row}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      ) : (
        <ItemNotFound
          image_url={require("@/assets/img/service-not-found.png")}
          size={200}
          message="Service Not Found"
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "stretch",
  },
  cardWrapper: {
    flex: 1,
    marginRight: 8,
  },
});

export default ServiceList;
