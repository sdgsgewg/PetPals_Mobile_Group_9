import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useGlobal } from "@/app/context/GlobalContext";
import IAdoptionTransaction from "@/app/interface/transaction/IAdoptionTransaction";
import IServiceTransaction from "@/app/interface/transaction/IServiceTransaction";
import ITransaction from "@/app/interface/transaction/ITransaction";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { usePets } from "@/app/context/pets/PetsContext";
import { Router, useRouter } from "expo-router";
import IService from "@/app/interface/service/IService";

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
  const {
    isTransactionHistory,
    isAdoptionTransactionRequest,
    isServiceTransactionRequest,
  } = useTransactions();
  const { isIPet } = usePets();

  const router = useRouter();

  let imageUrl: ImageSourcePropType = require("@/assets/img/pets.jpg");
  let itemName = "";

  if (isTransactionHistory(transaction)) {
    itemName = transaction.item.name;
    if (
      transaction?.transactionType?.toLowerCase() === "adoption" &&
      isIPet(transaction.item)
    ) {
      imageUrl =
        getImageUrlByBreed(
          transaction?.item?.species?.name,
          transaction?.item?.breed
        ) ?? require("@/assets/img/pets.jpg");
    } else {
      const service = transaction.item as IService;
      imageUrl =
        getImageUrlByServiceCategory(service?.category?.name) ??
        require("@/assets/img/services.jpg");
    }
  } else if (isAdoptionTransactionRequest(transaction)) {
    imageUrl =
      getImageUrlByBreed(
        transaction?.pet?.species?.name,
        transaction?.pet?.breed
      ) ?? require("@/assets/img/pets.jpg");
    itemName = transaction.pet.name;
  } else if (isServiceTransactionRequest(transaction)) {
    imageUrl =
      getImageUrlByServiceCategory(transaction?.service?.category?.name) ??
      require("@/assets/img/services.jpg");
    itemName = transaction.service.name;
  }

  const goToTransactionDetail = (
    router: Router,
    transactionType: string,
    transactionId: string
  ) => {
    router.push({
      pathname: "/transactions/[transactionType]/[transactionId]",
      params: { transactionType, transactionId },
    });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        goToTransactionDetail(
          router,
          transaction.transactionType.toLowerCase(),
          transaction.transactionId.toString()
        )
      }
      style={styles.card}
    >
      <Text style={styles.userText}>
        {transactionType === "history"
          ? isTransactionHistory(transaction)
            ? transaction?.user?.name
            : "Unknown"
          : `From ${
              isAdoptionTransactionRequest(transaction) ||
              isServiceTransactionRequest(transaction)
                ? transaction?.adopter?.name
                : "Unknown"
            }`}
      </Text>

      <View style={styles.contentWrapper}>
        <Image source={imageUrl} style={styles.image} />
        <Text style={styles.itemName}>{itemName}</Text>
      </View>

      <Text style={styles.price}>{`Rp ${formattedPrice(
        transaction.price
      )}`}</Text>
    </TouchableOpacity>
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
    gap: 8,
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
