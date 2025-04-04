import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { IService } from "@/app/interface/service/IService";
import ServiceCard from "./ServiceCard";
import { useServices } from "@/app/context/services/ServicesContext";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";

interface ServiceListProps {
  filteredServices: IService[];
}

const ServiceList: React.FC<ServiceListProps> = ({ filteredServices }) => {
  const { loading } = useServices();

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      {filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => <ServiceCard service={item} />}
        />
      ) : (
        <ItemNotFound
          image_url={require("@/assets/img/service-not-found.png")}
          size={200}
          message="Service Not Found"
        />
      )}
    </View>
  );
};

export default ServiceList;
