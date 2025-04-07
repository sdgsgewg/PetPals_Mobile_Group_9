import { useGlobal } from "@/app/context/GlobalContext";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";
import { ITransaction } from "@/app/interface/transaction/ITransaction";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

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

  const imageUrl =
    transactionType === "history"
      ? transaction.transactionType.toLowerCase() === "service"
        ? getImageUrlByServiceCategory(transaction?.item?.category?.name)
        : getImageUrlByBreed(
            transaction?.item?.species?.name,
            transaction?.item?.breed
          )
      : transaction.transactionType === "Adoption"
      ? getImageUrlByBreed(transaction.pet.species.name, transaction.pet.breed)
      : getImageUrlByServiceCategory(transaction.service.category.name);

  const itemName =
    transactionType === "history"
      ? transaction.item.name
      : transactionType === "adoptionReq"
      ? transaction.pet.name
      : transaction.service.name;

  return (
    <View style={styles.card}>
      <Text style={styles.userText}>
        {transactionType === "history"
          ? transaction.user.name
          : `From ${transaction.adopter.name}`}
      </Text>
      <View style={styles.contentWrapper}>
        <Image
          source={
            transaction.transactionType.toLowerCase() === "adoption"
              ? require("@/assets/img/pets.jpg")
              : require("@/assets/img/services.jpg")
          }
          style={styles.image}
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
