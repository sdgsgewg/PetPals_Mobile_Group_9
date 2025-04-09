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
  isRemoveItemModalOpen: boolean;
  handleOpenRemoveItemModal: () => void;
  handleCloseRemoveItemModal: () => void;
  getImageUrlByBreed: (species: string, breed: string) => string | null;
  getImageUrlByServiceCategory: (categoryName: string) => string | null;
  formattedAge: (age: number) => string | null;
  formattedPrice: (price: number | string) => string;
  getForumCategoryName: (categoryName: string) => string | null;
  formattedDate: (dateString: string) => string | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setState: (name: string, value: string | number) => void
  ) => void;
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

  const handleOpenRemoveItemModal = () => {
    dispatch({ type: GlobalActionType.SET_REMOVE_ITEM_MODAL, payload: true });
  };
  const handleCloseRemoveItemModal = () => {
    dispatch({ type: GlobalActionType.SET_REMOVE_ITEM_MODAL, payload: false });
  };

  const getImageUrlByBreed = (species: string, breed: string) => {
    if (!species || !breed) return null;
    const modifiedSpecies = species?.toLowerCase();
    const modifiedBreed = breed
      ?.split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
    return `/img/breed/${modifiedSpecies}/${modifiedBreed}.jpg`;
  };

  const getImageUrlByServiceCategory = (categoryName: string) => {
    if (!categoryName) return null;
    const modifiedCategoryName = categoryName
      ?.split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
    return `/img/services/${modifiedCategoryName}.jpg`;
  };

  const formattedAge = (age: number) => {
    const years = Math.floor(age);
    const months = Math.round((age - years) * 12);

    let result = "";
    if (years > 0) result += `${years} Year${years > 1 ? "s" : ""}`;
    if (months > 0)
      result += `${years > 0 ? " " : ""}${months} Month${
        months > 1 ? "s" : ""
      }`;
    return result || "Unknown";
  };

  const formattedPrice = (value: number | string): string => {
    if (!value) return "";
    const number =
      typeof value === "string" ? parseInt(value.replace(/\D/g, "")) : value;
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const getForumCategoryName = (categoryName: string) => {
    if (!categoryName) return null;
    const modifiedCategory =
      categoryName.charAt(0).toUpperCase() +
      categoryName.slice(1).toLowerCase();
    return modifiedCategory;
  };

  const formattedDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Meng-update state ketika input berubah
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setState: (name: string, value: string | number) => void
  ) => {
    const { name, value } = e.target;
    setState(name, value);
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
        isRemoveItemModalOpen: state.isRemoveItemModalOpen,
        handleOpenRemoveItemModal,
        handleCloseRemoveItemModal,
        getImageUrlByBreed,
        getImageUrlByServiceCategory,
        formattedAge,
        formattedPrice,
        getForumCategoryName,
        formattedDate,
        handleInputChange,
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
