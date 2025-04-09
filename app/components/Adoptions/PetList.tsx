import React from "react";
import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";
import PetCard from "./PetCard";
import IPet from "@/app/interface/pet/IPet";
import { usePets } from "@/app/context/pets/PetsContext";
import ItemNotFound from "../ItemNotFound";
import Loading from "../Loading";

interface PetListProps {
  filteredPets: IPet[];
}

const PetList: React.FC<PetListProps> = ({ filteredPets }) => {
  const { loading } = usePets();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      {filteredPets.length > 0 ? (
        <FlatList
          data={filteredPets}
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
              <PetCard pet={item} />
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
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 8,
  },
});

export default PetList;
