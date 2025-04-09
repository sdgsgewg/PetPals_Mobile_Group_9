import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";
import { ITransaction } from "@/app/interface/transaction/ITransaction";

// Type Guards
const isAdoptionTransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is IAdoptionTransaction => "pet" in transaction;

const isServiceTransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is IServiceTransaction => "service" in transaction;

const isITransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is ITransaction => "item" in transaction;

const isIService = (item: IPet | IService): item is IService =>
  "category" in item;

interface TransactionCardProps {
  transactionType: string; // history | adoptionReq | serviceReq
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction;
}

// Mapping untuk gambar lokal
const localImages: Record<string, any> = {
  pets: require("@/assets/img/pets.jpg"),
  services: require("@/assets/img/services.jpg"),
  fallback: require("@/assets/img/pets.jpg"),
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  transactionType,
  transaction,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();

  const [fallbackImage, setFallbackImage] = useState(false);

  let imageUrl: string | undefined;
  let localImageKey: "pets" | "services" | null = null;
  let itemName = "";

  // Tentukan image dan nama
  if (isAdoptionTransaction(transaction)) {
    localImageKey = "pets";
    itemName = transaction.pet.name;
  } else if (isServiceTransaction(transaction)) {
    localImageKey = "services";
    itemName = transaction.service.name;
  } else if (isITransaction(transaction)) {
    itemName = transaction.item.name;
    if (transaction.itemType === "service" && isIService(transaction.item)) {
      imageUrl = getImageUrlByServiceCategory(transaction.item.category);
    } else {
      const pet = transaction.item as IPet;
      imageUrl = getImageUrlByBreed(pet?.species?.name, pet.breed);
    }
  }

  const displayImage = () => {
    if (fallbackImage) return localImages.fallback;
    if (imageUrl?.startsWith("http")) return { uri: imageUrl };
    if (localImageKey) return localImages[localImageKey];
    return localImages.fallback;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.userText}>
        {transactionType === "history"
          ? isITransaction(transaction)
            ? transaction.user.name
            : "Unknown"
          : `From ${
              isAdoptionTransaction(transaction)
                ? transaction.adopter?.name
                : "Unknown"
            }`}
      </Text>

      <View style={styles.contentWrapper}>
        <Image
          source={displayImage()}
          style={styles.image}
          onError={() => setFallbackImage(true)}
        />
        <Text style={styles.itemName}>{itemName}</Text>
      </View>

      <Text style={styles.price}>{`Rp ${formattedPrice(
        transaction.price
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
  },
  userText: {
    fontWeight: "600",
    marginBottom: 8,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
    marginRight: 16,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 16,
    flex: 1,
    flexWrap: "wrap",
  },
  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "600",
    color: "#1D4ED8",
    textAlign: "right",
  },
});

export default TransactionCard;
