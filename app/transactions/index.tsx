import React, { useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionFilter from "@/app/components/Transactions/TransactionFilter";
import TransactionList from "@/app/components/Transactions/TransactionList";

const Transactions = () => {
  const { loggedInUser } = useUsers();
  const { transactionType, fetchTransactionHistory, error } = useTransactions();

  useEffect(() => {
    fetchTransactionHistory(loggedInUser.userId, transactionType);
  }, []);

  useEffect(() => {
    fetchTransactionHistory(loggedInUser.userId, transactionType);
  }, [transactionType]);

  if (error) {
    return <PageNotFound image_url="/img/page-not-found.png" message="" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>
      <TransactionFilter />
      <TransactionList transactionType="history" />
    </ScrollView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
});
