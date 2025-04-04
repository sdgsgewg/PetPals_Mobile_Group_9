import { GlobalAction, GlobalActionType } from "./GlobalActions";

export interface GlobalState {
  isMessageModalOpen: boolean;
  isFilterModalOpen: boolean;
}

export const initialState: GlobalState = {
  isMessageModalOpen: false,
  isFilterModalOpen: false,
};

export function GlobalReducer(state: GlobalState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.SET_MESSAGE_MODAL:
      return { ...state, isMessageModalOpen: action.payload };
    case GlobalActionType.SET_FILTER_MODAL:
      return { ...state, isFilterModalOpen: action.payload };
    default:
      return state;
  }
}
