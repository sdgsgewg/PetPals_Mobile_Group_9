import { createContext, ReactNode, useContext, useReducer } from "react";
import api from "@/lib/apiClient";
import { GlobalActionType } from "../GlobalActions";
import { TransactionsReducer, initialState } from "./TransactionsReducer";
import { ITransaction } from "@/app/interface/transaction/ITransaction";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";

interface TransactionsContextType {
  transactions: ITransaction[] | IAdoptionTransaction[] | IServiceTransaction[];
  transactionType: string;
  setTransactionType: (transactionType: string) => void;
  fetchTransactionHistory: (
    adopterId: number,
    transactionType: string
  ) => Promise<void>;
  fetchAdoptionTransactionRequest: (ownerId: number) => Promise<void>;
  fetchServiceTransactionRequest: (providerId: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(TransactionsReducer, initialState);

  const setTransactionType = (transactionType: string) => {
    dispatch({
      type: GlobalActionType.SET_TRANSACTION_TYPE,
      payload: transactionType,
    });
  };

  const fetchTransactionHistory = async (adopterId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(
        `/transaction-history/${adopterId}?transactionType=${state.transactionType}`
      );

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_TRANSACTION_HISTORY,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch transaction history failed",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        console.warn("No transactions found for the given AdopterId.");
        // Set transaksi kosong tanpa error
        dispatch({
          type: GlobalActionType.GET_TRANSACTION_HISTORY,
          payload: [],
        });
      } else {
        console.error("Error fetching transaction history:", error);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch transaction history failed",
        });
      }
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchAdoptionTransactionRequest = async (ownerId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(
        `/adoption-transaction-request/${ownerId}`
      );

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ADOPTION_TRANSACTION_REQUEST,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch adoption transaction request failed",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        console.warn("No transaction request found for the given OwnerId.");
        dispatch({
          type: GlobalActionType.GET_ADOPTION_TRANSACTION_REQUEST,
          payload: [],
        });
      } else {
        console.error("Error fetching adoption transaction request:", error);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch adoption transaction request failed",
        });
      }
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchServiceTransactionRequest = async (providerId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(
        `/service-transaction-request/${providerId}`
      );

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_SERVICE_TRANSACTION_REQUEST,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch service transaction request failed",
        });
      }
    } catch (error: any) {
      if (error.response?.status === 404 || error.response?.status === 400) {
        console.warn(
          "No service transaction request found for the given ProviderId."
        );
        dispatch({
          type: GlobalActionType.GET_SERVICE_TRANSACTION_REQUEST,
          payload: [],
        });
      } else {
        console.error("Error fetching service transaction request:", error);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch service transaction request failed",
        });
      }
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactionType: state.transactionType,
        transactions: state.transactions,
        fetchTransactionHistory,
        fetchAdoptionTransactionRequest,
        fetchServiceTransactionRequest,
        setTransactionType,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
}
