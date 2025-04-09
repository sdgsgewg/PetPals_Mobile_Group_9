import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import IPet from "@/app/interface/pet/IPet";
import { Router, useRouter } from "expo-router";

interface PetCardProps {
  pet: IPet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const { getImageUrlByBreed, formattedAge, formattedPrice } = useGlobal();
  const router = useRouter();

  const goToPetDetail = (router: Router, slug: string) => {
    router.push({
      pathname: "/adoptions/[slug]",
      params: { slug },
    });
  };

  return (
    <TouchableOpacity
      onPress={() => goToPetDetail(router, pet.slug)}
      style={styles.card}
    >
      {/* Pet Image */}
      <View style={styles.imageContainer}>
        <Image
          // source={{ uri: getImageUrlByBreed(pet?.species?.name, pet?.breed) }}
          source={require("@/assets/img/pets.jpg")}
          style={styles.image}
        />
      </View>

      {/* Pet Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.breed}>{pet.breed}</Text>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.age}>{formattedAge(pet.age)}</Text>
        <Text style={styles.price}>{"Rp " + formattedPrice(pet.price)}</Text>
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
  },
  imageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 12,
  },
  breed: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 2,
  },
  age: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginTop: 6,
  },
});

export default PetCard;
