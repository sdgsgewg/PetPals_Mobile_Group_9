import React from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import PetCard from "./PetCard";
import { IPet } from "@/app/interface/pet/IPet";
import { usePets } from "@/app/context/pets/PetsContext";
import Loading from "@/app/loading";
import ItemNotFound from "../ItemNotFound";

interface PetListProps {
  filteredPets: IPet[];
}

const PetList: React.FC<PetListProps> = ({ filteredPets }) => {
  const { loading } = usePets();

  if (loading) {
    return <Loading />;
  }

  return (
    <View>
      {filteredPets.length > 0 ? (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => <PetCard pet={item} />}
        />
      ) : (
        <ItemNotFound
          image_url={require("@/assets/img/pet-not-found.png")}
          size={200}
          message="Pet Not Found"
        />
      )}
    </View>
  );
};

export default PetList;
