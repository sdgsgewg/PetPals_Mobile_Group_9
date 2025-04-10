import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import PageNotFound from "@/app/components/PageNotFound";
import TransactionFilter from "@/app/components/Transactions/TransactionFilter";
import TransactionList from "@/app/components/Transactions/TransactionList";
import NormalContent from "../components/ContentTemplate/NormalContent";
import { useRouter } from "expo-router";

const Transactions = () => {
  const { loggedInUser } = useUsers();
  const { transactionType, fetchTransactionHistory, error } = useTransactions();

  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) return;

    const role = loggedInUser.role?.name?.toLowerCase();

    if (role === "owner") {
      router.push("/transactions/owner");
    } else if (role === "provider") {
      router.push("/transactions/provider");
    }
  }, [loggedInUser]);

  useEffect(() => {
    const role = loggedInUser?.role?.name?.toLowerCase();
    if (role === "adopter") {
      fetchTransactionHistory(loggedInUser.userId, transactionType);
    }
  }, [loggedInUser]);

  useEffect(() => {
    fetchTransactionHistory(loggedInUser.userId, transactionType);
  }, [transactionType]);

  if (error) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>
      <TransactionFilter />
      <TransactionList transactionType="history" />
    </NormalContent>
  );
};

export default Transactions;

const styles = StyleSheet.create({
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
