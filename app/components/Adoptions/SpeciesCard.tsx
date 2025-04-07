import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ISpecies } from "@/app/interface/pet/ISpecies";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/Navigation";
interface SpeciesCardProps {
  species: ISpecies;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AdoptionList">;
const SpeciesCard: React.FC<SpeciesCardProps> = ({ species }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdoptionList", { slug: species.slug })
      }
    >
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "#fff",
          marginBottom: 10,
        }}
      >
        <Image
          source={{ uri: species.image }}
          style={{ width: "100%", height: 150, opacity: 0.85 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            width: "100%",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            {species.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SpeciesCard;
