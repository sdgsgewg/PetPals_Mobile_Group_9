"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import { GlobalReducer, initialState } from "./GlobalReducer";
import { GlobalActionType } from "./GlobalActions";

interface GlobalContextType {
  isMessageModalOpen: boolean;
  handleOpenMessageModal: () => void;
  handleCloseMessageModal: () => void;
  isFilterModalOpen: boolean;
  handleOpenFilterModal: () => void;
  handleCloseFilterModal: () => void;
  getImageUrlByBreed: (species: string, breed: string) => string | null;
  getImageUrlByServiceCategory: (categoryName: string) => string | null;
  formattedAge: (age: number) => string | null;
  formattedPrice: (price: number | string) => string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  const handleOpenMessageModal = () => {
    dispatch({ type: GlobalActionType.SET_MESSAGE_MODAL, payload: true });
  };

  const handleCloseMessageModal = () => {
    dispatch({ type: GlobalActionType.SET_MESSAGE_MODAL, payload: false });
  };

  const handleOpenFilterModal = () => {
    dispatch({ type: GlobalActionType.SET_FILTER_MODAL, payload: true });
  };
  const handleCloseFilterModal = () => {
    dispatch({ type: GlobalActionType.SET_FILTER_MODAL, payload: false });
  };

  const getImageUrlByBreed = (species: string, breed: string) => {
    // if (!species || !breed) return null;
    // const modifiedSpecies = species?.toLowerCase();
    // const modifiedBreed = breed
    //   ?.split(" ")
    //   .map((word) => word.toLowerCase())
    //   .join("-");
    // return `/img/breed/${modifiedSpecies}/${modifiedBreed}.jpg`;
    return `/img/pets.jpg`;
  };

  const getImageUrlByServiceCategory = (categoryName: string) => {
    // if (!categoryName) return null;
    // const modifiedCategoryName = categoryName
    //   ?.split(" ")
    //   .map((word) => word.toLowerCase())
    //   .join("-");
    // return `/img/services/${modifiedCategoryName}.jpg`;
    return `/img/services.jpg`;
  };

  const formattedAge = (age: number) => {
    if (age === 0) return "Unknown";
    if (age < 1) return `${age * 10} months`;
    return `${age} years`;
  };

  const formattedPrice = (value: number | string): string => {
    if (!value) return "";
    const number =
      typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
    return new Intl.NumberFormat("id-ID").format(number);
  };

  return (
    <GlobalContext.Provider
      value={{
        isMessageModalOpen: state.isMessageModalOpen,
        handleOpenMessageModal,
        handleCloseMessageModal,
        isFilterModalOpen: state.isFilterModalOpen,
        handleOpenFilterModal,
        handleCloseFilterModal,
        getImageUrlByBreed,
        getImageUrlByServiceCategory,
        formattedAge,
        formattedPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
}
