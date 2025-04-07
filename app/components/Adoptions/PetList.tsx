import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
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

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      {filteredPets.length > 0 ? (
        <FlatList
          data={filteredPets}
          keyExtractor={(item) => item.slug}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <PetCard pet={item} />
            </View>
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.contentContainer}
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    marginRight: 8,
  },
});

export default PetList;
