import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ISpecies } from "@/app/interface/pet/ISpecies";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/Navigation";

interface SpeciesCardProps {
  species: ISpecies;
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AdoptionList"
>;

const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdoptionList", { slug: species.slug })
      }
      activeOpacity={0.85}
      style={styles.card}
    >
      <Image
        source={{ uri: species.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>{species.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth * 0.9;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 10,
    alignSelf: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 160,
    opacity: 0.88,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SpeciesCard;
