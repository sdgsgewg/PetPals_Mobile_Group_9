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
  getImageUrlByBreed: (species: string, breed: string) => string;
  getImageUrlByServiceCategory: (categoryName: string) => string;
  formattedPrice: (price: number) => string;
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
    if (!species || !breed) return "";
    const modifiedSpecies = species?.toLowerCase();
    const modifiedBreed = breed
      ?.split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
    return `/img/breed/${modifiedSpecies}/${modifiedBreed}.jpg`;
  };

  const serviceCategoryImages: { [key: string]: any } = {
    "grooming-hewan": require("@/assets/img/services/grooming-hewan.jpg"),
    "pelatihan-hewan": require("@/assets/img/services/pelatihan-hewan.jpg"),
    "penitipan-hewan": require("@/assets/img/services/penitipan-hewan.jpg"),
    "penjaga-hewan": require("@/assets/img/services/penjaga-hewan.jpg"),
  };

  const getImageUrlByServiceCategory = (categoryName: string): any => {
    if (!categoryName) return "";

    // const modifiedCategoryName = categoryName
    //   ?.split(" ")
    //   .map((word) => word.toLowerCase())
    //   .join("-");
    // return `/img/services/${modifiedCategoryName}.jpg`;

    const key = categoryName
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");

    console.log(serviceCategoryImages[key]);

    return serviceCategoryImages[key] || null;
  };

  const formattedPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
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
