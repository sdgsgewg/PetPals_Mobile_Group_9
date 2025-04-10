import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import NormalContent from "@/app/components/ContentTemplate/NormalContent";
import PageNotFound from "@/app/components/PageNotFound";
import BookingDate from "@/app/components/Transactions/TransactionDetail/BookingDate";
import TransactionDetailCard from "@/app/components/Transactions/TransactionDetail/TransactionDetailCard";
import UserInfo from "@/app/components/Transactions/TransactionDetail/UserInfo";
import { useTransactions } from "@/app/context/transactions/TransactionsContext";
import { useUsers } from "@/app/context/users/UsersContext";
import Loading from "@/app/loading";
import IUser from "@/app/interface/user/IUser";

const TransactionDetail = () => {
  const router = useRouter();
  const { transactionType, transactionId } = useLocalSearchParams<{
    transactionType: string;
    transactionId: string;
  }>();

  const { loggedInUser } = useUsers();
  const {
    transaction,
    fetchAdoptionTransactionDetail,
    fetchServiceTransactionDetail,
    isAdoptionTransactionRequest,
    isServiceTransactionRequest,
    loading,
    error,
  } = useTransactions();

  const item =
    transactionType === "adoption" && isAdoptionTransactionRequest(transaction)
      ? transaction.pet
      : isServiceTransactionRequest(transaction)
      ? transaction.service
      : null;

  useEffect(() => {
    if (!transactionType || !transactionId) return;

    if (transactionType === "adoption") {
      fetchAdoptionTransactionDetail(Number(transactionId));
    } else {
      fetchServiceTransactionDetail(Number(transactionId));
    }
  }, [transactionType, transactionId]);

  if (loading) {
    return (
      <NormalContent>
        <Loading />
      </NormalContent>
    );
  }

  if (error || !transaction || !item) {
    return (
      <NormalContent>
        <PageNotFound image_url="/img/page-not-found.png" message="" />
      </NormalContent>
    );
  }

  return (
    <NormalContent>
      {/* Informasi Pengguna */}
      <UserInfo
        user={
          loggedInUser?.role?.name?.toLowerCase() === "adopter"
            ? transactionType === "adoption" &&
              isAdoptionTransactionRequest(transaction)
              ? transaction.owner
              : isServiceTransactionRequest(transaction)
              ? transaction.provider
              : ({} as IUser)
            : transaction.adopter
        }
        item={item}
      />

      {/* Kartu Detail Transaksi */}
      {item && (
        <View style={styles.cardContainer}>
          <TransactionDetailCard
            transactionType={transactionType?.toString()}
            item={item}
          />
        </View>
      )}

      {/* Tanggal Booking */}
      <BookingDate />
    </NormalContent>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 16,
  },
});

export default TransactionDetail;
