import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { useServices } from "@/app/context/services/ServicesContext";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import IPet from "@/app/interface/pet/IPet";
import IService from "@/app/interface/service/IService";

interface TransactionDetailCardProps {
  transactionType: string | undefined; // adoption or service
  item: IPet | IService;
}

const TransactionDetailCard: React.FC<TransactionDetailCardProps> = ({
  transactionType,
  item,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();
  const { transaction } = useTransactions();
  const { isIPet } = usePets();
  const { isIService } = useServices();

  if (!item) return null;

  let imageUrl: ImageSourcePropType =
    transactionType?.toLowerCase() === "service" && isIService(item)
      ? getImageUrlByServiceCategory(item?.category?.name) ??
        require("@/assets/img/services.jpg")
      : isIPet(item)
      ? getImageUrlByBreed(item?.species?.name, item?.breed) ??
        require("@/assets/img/pets.jpg")
      : require("@/assets/img/pets.jpg");

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={imageUrl} style={styles.image} resizeMode="cover" />
        <View style={styles.details}>
          <Text style={styles.name}>{item?.name}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {transactionType?.toLowerCase() === "adoption" && isIPet(item)
                ? item?.breed
                : isIService(item)
                ? item?.category?.name
                : ""}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{`Rp ${formattedPrice(
          transaction.price
        )}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  tag: {
    backgroundColor: "#CBD5E1",
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1E293B",
  },
  priceContainer: {
    marginTop: 12,
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1D4ED8",
  },
});

export default TransactionDetailCard;
