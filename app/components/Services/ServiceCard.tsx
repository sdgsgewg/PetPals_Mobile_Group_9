import { IService } from "@/app/interface/service/IService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import CardLayout from "../Cards/CardLayout";
import { useGlobal } from "@/app/context/GlobalContext";
import { Router, useRouter } from "expo-router";

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { getImageUrlByServiceCategory, formattedPrice } = useGlobal();
  const router = useRouter();

  const goToServiceDetail = (router: Router, slug: string) => {
    router.push({
      pathname: "/services/[slug]",
      params: { slug },
    });
  };

  return (
    <TouchableOpacity onPress={() => goToServiceDetail(router, service.slug)}>
      <CardLayout>
        <View style={styles.imageContainer}>
          <Image
            source={getImageUrlByServiceCategory(service?.category?.name)}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.categoryText}>{service?.category?.name}</Text>
            <Text style={styles.nameText}>{service.name}</Text>
            <View style={styles.locationContainer}>
              <FontAwesomeIcon
                icon={faLocationDot}
                size={12}
                style={styles.icon}
              />
              <Text style={styles.cityText}>{service.city}</Text>
            </View>
          </View>
          <Text style={styles.priceText}>
            {"Rp " + formattedPrice(service.price)}
          </Text>
        </View>
      </CardLayout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "55%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  contentContainer: {
    width: "100%",
    height: "45%",
    justifyContent: "space-between",
    padding: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  icon: {
    color: "#ef4444",
  },
  cityText: {
    fontSize: 12,
    color: "#475569",
  },
  priceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
});

export default ServiceCard;
