import { GlobalAction, GlobalActionType } from "../GlobalActions";
import { IAdoptionTransaction } from "@/app/interface/transaction/IAdoptionTransaction";

export interface AdoptionState {
  adoptions: IAdoptionTransaction[];
  loading: boolean;
  error: string | null;
}

export const initialState: AdoptionState = {
  adoptions: [],
  loading: false,
  error: null,
};

export function AdoptionsReducer(state: AdoptionState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.ADOPT_PET:
      return { ...state };
    case GlobalActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case GlobalActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
