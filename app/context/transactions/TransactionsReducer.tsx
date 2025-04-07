import { ITransaction } from "@/app/interface/transaction/ITransaction";
import { GlobalAction, GlobalActionType } from "../GlobalActions";
import { IServiceTransaction } from "@/app/interface/transaction/IServiceTransaction";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";

export interface TransactionState {
  transaction: IAdoptionTransaction | IServiceTransaction;
  transactions: ITransaction[] | IAdoptionTransaction[] | IServiceTransaction[];
  transactionType: string;
  loading: boolean;
  error: string | null;
}

export const initialState: TransactionState = {
  transaction: {} as IAdoptionTransaction | IServiceTransaction,
  transactions: [],
  transactionType: "All",
  loading: false,
  error: null,
};

export function TransactionsReducer(
  state: TransactionState,
  action: GlobalAction
) {
  switch (action.type) {
    case GlobalActionType.SET_TRANSACTION_TYPE:
      return { ...state, transactionType: action.payload };
    case GlobalActionType.GET_TRANSACTION_HISTORY:
      return { ...state, transactions: action.payload };
    case GlobalActionType.GET_ADOPTION_TRANSACTION_DETAIL:
      return { ...state, transaction: action.payload };
    case GlobalActionType.GET_SERVICE_TRANSACTION_DETAIL:
      return { ...state, transaction: action.payload };
    case GlobalActionType.GET_ADOPTION_TRANSACTION_REQUEST:
      return { ...state, transactions: action.payload };
    case GlobalActionType.GET_SERVICE_TRANSACTION_REQUEST:
      return { ...state, transactions: action.payload };
    case GlobalActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case GlobalActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
