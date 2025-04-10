import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { usePets } from "@/app/context/pets/PetsContext";
import Loading from "../Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobal } from "@/app/context/GlobalContext";
import IPet from "@/app/interface/pet/IPet";
import { useRouter } from "expo-router";
import styles from "./styles";

interface MyPetTableProps {
  updateSelectedPet: (pet: IPet) => void;
}

const MyPetTable: React.FC<MyPetTableProps> = ({ updateSelectedPet }) => {
  const { formattedAge, handleOpenRemoveItemModal } = useGlobal();
  const { ownerPets, loading } = usePets();
  const router = useRouter();

  const goToPetDetail = (slug: string) => {
    router.push({
      pathname: "/adoptions/[slug]",
      params: { slug },
    });
  };

  const goToEditPet = (slug: string) => {
    router.push({
      pathname: "/adoptions/edit/[slug]",
      params: { slug },
    });
  };

  const handleRemovePet = (pet: IPet) => {
    updateSelectedPet(pet);
    handleOpenRemoveItemModal();
  };

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.indexCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
      <Text style={[styles.cell, styles.ageCell]}>
        {formattedAge(item.age)}
      </Text>
      <Text style={[styles.cell, styles.genderCell]}>{item.gender}</Text>
      <View style={[styles.cell, styles.actionsCell]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => goToPetDetail(item.slug)}
        >
          <MaterialCommunityIcons name="eye" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => goToEditPet(item.slug)}
        >
          <MaterialCommunityIcons name="pencil" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleRemovePet(item)}
        >
          <MaterialCommunityIcons name="trash-can" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal>
      <View>
        <View style={styles.header}>
          <Text style={[styles.headerCell, styles.indexCell]}>#</Text>
          <Text style={[styles.headerCell, styles.nameCell]}>Name</Text>
          <Text style={[styles.headerCell, styles.ageCell]}>Age</Text>
          <Text style={[styles.headerCell, styles.genderCell]}>Gender</Text>
          <Text style={[styles.headerCell, styles.actionsCell]}>Actions</Text>
        </View>
        <FlatList
          data={ownerPets}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          bounces={false}
        />
      </View>
    </ScrollView>
  );
};

export default MyPetTable;
