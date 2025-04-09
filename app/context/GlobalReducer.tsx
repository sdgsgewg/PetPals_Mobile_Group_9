import { GlobalAction, GlobalActionType } from "./GlobalActions";

export interface GlobalState {
  isMessageModalOpen: boolean;
  isFilterModalOpen: boolean;
  isRemoveItemModalOpen: boolean;
}

export const initialState: GlobalState = {
  isMessageModalOpen: false,
  isFilterModalOpen: false,
  isRemoveItemModalOpen: false,
};

export function GlobalReducer(state: GlobalState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.SET_MESSAGE_MODAL:
      return { ...state, isMessageModalOpen: action.payload };
    case GlobalActionType.SET_FILTER_MODAL:
      return { ...state, isFilterModalOpen: action.payload };
    case GlobalActionType.SET_REMOVE_ITEM_MODAL:
      return { ...state, isRemoveItemModalOpen: action.payload };
    default:
      return state;
  }
}
