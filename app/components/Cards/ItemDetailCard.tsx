import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { useUsers } from "@/app/context/users/UsersContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";

interface ItemDetailCardProps {
  itemType: string;
  imageUrl: string | null;
  status?: string | null;
  price: string | null;
  isAdopted?: boolean;
  onClick: () => void;
}

const ItemDetailCard: React.FC<ItemDetailCardProps> = ({
  itemType,
  imageUrl,
  status = null,
  price,
  isAdopted = false,
  onClick,
}) => {
  const { loggedInUser } = useUsers();
  const petContext = usePets();
  const serviceContext = useServices();

  const isPet = itemType === "pet";
  const data = isPet ? petContext.pet : serviceContext.service;

  return (
    <ScrollView style={styles.detailCard}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <Text style={styles.title}>{data.name}</Text>
      {isPet ? (
        <>
          <Text style={styles.text}>Species: {data?.species?.name}</Text>
          <Text style={styles.text}>Breed: {data.breed}</Text>
          <Text style={styles.text}>Age: {data.age} years</Text>
          <Text style={styles.text}>Gender: {data.gender}</Text>
          <Text style={styles.text}>Status: {status}</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>Category: {data?.category?.name}</Text>
          <Text style={styles.text}>Address: {data.address}</Text>
          <Text style={styles.text}>City: {data.city}</Text>
        </>
      )}
      <Text style={styles.price}>Price: Rp {price}</Text>
      <TouchableOpacity
        style={[styles.button, isAdopted ? styles.disabledButton : {}]}
        onPress={onClick}
        disabled={isAdopted}
      >
        <Text style={styles.buttonText}>
          {isAdopted ? "Adopted" : isPet ? "Adopt Now" : "Book Now"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ItemDetailCard;
