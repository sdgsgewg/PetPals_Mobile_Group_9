import IService from "@/app/interface/service/IService";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
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

  let imageUrl: ImageSourcePropType =
    getImageUrlByServiceCategory(service?.category?.name) ??
    require("@/assets/img/services.jpg");

  return (
    <TouchableOpacity
      onPress={() => goToServiceDetail(router, service.slug)}
      style={styles.card}
    >
      {/* Service Image */}
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTop}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 12,
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  infoTop: {
    marginBottom: 8,
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
    marginTop: "auto",
  },
});

export default ServiceCard;
