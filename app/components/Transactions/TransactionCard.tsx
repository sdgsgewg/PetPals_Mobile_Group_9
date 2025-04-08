import { useGlobal } from "@/app/context/GlobalContext";
import { IPet } from "@/app/interface/pet/IPet";
import { IService } from "@/app/interface/service/IService";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";
import { ITransaction } from "@/app/interface/transaction/ITransaction";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// Type Guard for IAdoptionTransaction
const isAdoptionTransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is IAdoptionTransaction => "pet" in transaction;

// Type Guard for IServiceTransaction
const isServiceTransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is IServiceTransaction => "service" in transaction;

// Type Guard for ITransaction
const isITransaction = (
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction
): transaction is ITransaction => "item" in transaction;

// Type Guard for IService (to check if item is IService)
const isIService = (item: IPet | IService): item is IService => "category" in item;

interface TransactionCardProps {
  transactionType: string; // history | adoptionReq | serviceReq
  transaction: ITransaction | IAdoptionTransaction | IServiceTransaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transactionType,
  transaction,
}) => {
  const { getImageUrlByBreed, getImageUrlByServiceCategory, formattedPrice } =
    useGlobal();

  let imageUrl;
  let itemName;

  // Handle IAdoptionTransaction
  if (isAdoptionTransaction(transaction)) {
    imageUrl = getImageUrlByBreed(transaction.pet.species.name, transaction.pet.breed);
    itemName = transaction.pet.name;
  } 
  // Handle IServiceTransaction
  else if (isServiceTransaction(transaction)) {
    imageUrl = getImageUrlByServiceCategory(transaction.service.category.name);
    itemName = transaction.service.name;
  } 
  // Handle ITransaction (general case)
  else if (isITransaction(transaction)) {
    if (transaction.itemType === "service" && isIService(transaction.item)) {
      imageUrl = getImageUrlByServiceCategory(transaction.item.category.name);
    } else {
      // Make sure the item is an IPet
      const pet = transaction.item as IPet;
      imageUrl = getImageUrlByBreed(pet.species.name, pet.breed);
    }
    itemName = transaction.item.name;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.userText}>
        {transactionType === "history"
          ? (isITransaction(transaction) ? transaction.user.name : "Unknown")
          : `From ${isAdoptionTransaction(transaction) ? transaction.adopter?.name : "Unknown"}`} 
      </Text>
      <View style={styles.contentWrapper}>
        <Image
          source={imageUrl ? { uri: imageUrl } : require("@/assets/img/default.jpg")}
          style={styles.image}
        />
        <Text style={styles.itemName}>{itemName}</Text>
      </View>
      <Text style={styles.price}>{`Rp ${formattedPrice(transaction.price)}`}</Text>
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
  },
  itemName: {
    fontWeight: "600",
    fontSize: 16,
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
