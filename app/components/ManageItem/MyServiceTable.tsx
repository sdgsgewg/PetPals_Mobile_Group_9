import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Loading from "../Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobal } from "@/app/context/GlobalContext";
import { useRouter } from "expo-router";
import IService from "@/app/interface/service/IService";
import { useServices } from "@/app/context/services/ServicesContext";
import styles from "./styles";

interface MyServiceTableProps {
  updateSelectedService: (service: IService) => void;
}

const MyServiceTable: React.FC<MyServiceTableProps> = ({
  updateSelectedService,
}) => {
  const { formattedPrice, handleOpenRemoveItemModal } = useGlobal();
  const { providerServices, loading } = useServices();
  const router = useRouter();

  const goToServiceDetail = (slug: string) => {
    router.push({
      pathname: "/services/[slug]",
      params: { slug },
    });
  };

  const goToEditService = (slug: string) => {
    router.push({
      pathname: "/services/edit/[slug]",
      params: { slug },
    });
  };

  const handleRemoveService = (service: IService) => {
    updateSelectedService(service);
    handleOpenRemoveItemModal();
  };

  if (loading) {
    return <Loading />;
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.indexCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
      <Text style={[styles.cell, styles.categoryCell]}>
        {item?.category?.name}
      </Text>
      <Text style={[styles.cell, styles.priceCell]}>
        {formattedPrice(item.price)}
      </Text>
      <View style={[styles.cell, styles.actionsCell]}>
        <TouchableOpacity
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => goToServiceDetail(item.slug)}
        >
          <MaterialCommunityIcons name="eye" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => goToEditService(item.slug)}
        >
          <MaterialCommunityIcons name="pencil" size={16} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleRemoveService(item)}
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
          <Text style={[styles.headerCell, styles.categoryCell]}>Category</Text>
          <Text style={[styles.headerCell, styles.priceCell]}>Price (Rp)</Text>
          <Text style={[styles.headerCell, styles.actionsCell]}>Actions</Text>
        </View>
        <FlatList
          data={providerServices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          bounces={false}
        />
      </View>
    </ScrollView>
  );
};

export default MyServiceTable;
