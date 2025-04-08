import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import Loading from "@/app/loading";
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import TransactionCard from "./TransactionCard";
import ItemNotFound from "../ItemNotFound";
import { ITransaction } from "@/app/interface/transaction/ITransaction";

interface TransactionListProps {
  transactionType: string; // history | adoptionReq | serviceReq
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactionType,
}) => {
  const { transactions, loading } = useTransactions();

  // Assuming the transactions can be of types ITransaction, IAdoptionTransaction, or IServiceTransaction
  const transactionList = transactionType === "history" ? transactions : transactions;

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : transactions.length > 0 ? (
        <FlatList
          // Casting the transactionList to ITransaction[]
          data={transactionList as ITransaction[]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <TransactionCard
              transactionType={transactionType}
              transaction={item}
            />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <ItemNotFound
          image_url="/img/pet-not-found.png"
          size={200}
          message="No Transaction Yet"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    gap: 24,
  },
});

export default TransactionList;
