import { createContext, ReactNode, useContext, useReducer } from "react";
import IPet from "../../interface/pet/IPet";
import { initialState, PetsReducer } from "./PetsReducer";
import { GlobalActionType } from "../GlobalActions";
import api from "@/lib/apiClient";
import IPetFilterParams from "../../interface/pet/IPetFilterParams";
import ISpecies from "../../interface/pet/ISpecies";
import INewPet from "@/app/interface/pet/INewPet";
import { useGlobal } from "../GlobalContext";
import { useRouter } from "expo-router";
import INewPetErrorMessage from "@/app/interface/pet/INewPetErrorMessage";
import IPetFilterErrorMessage from "@/app/interface/pet/IPetFiltersErrorMessage";
import IService from "@/app/interface/service/IService";

interface PetsContextType {
  species: ISpecies[];
  pets: IPet[];
  ownerPets: IPet[];
  pet: IPet;
  newPet: INewPet;
  filters: IPetFilterParams;
  petFiltersErrorMessages: IPetFilterErrorMessage;
  newPetErrorMessages: INewPetErrorMessage;
  setFilters: (name: string, value: string) => void;
  resetFilters: () => void;
  fetchPets: () => Promise<void>;
  fetchSpecies: () => Promise<void>;
  fetchPetDetail: (slug: string) => Promise<void>;
  setNewPet: (name: string, value: string | number) => void;
  resetNewPet: () => void;
  addNewPet: () => Promise<void>;
  editPet: (petId: number) => Promise<void>;
  removePet: (petId: number) => Promise<void>;
  fetchOwnerPets: (ownerId: number) => Promise<void>;
  isIPet: (item: IPet | IService) => item is IPet;
  loading: boolean;
  error: string | null;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export function PetsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(PetsReducer, initialState);

  const {
    handleOpenMessageModal,
    handleCloseMessageModal,
    handleCloseFilterModal,
  } = useGlobal();

  const router = useRouter();

  const fetchPets = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_PET_FILTERS_ERROR_MESSAGES,
    });

    try {
      const response = await api.get("/adoption-list", {
        params: {
          name: state.filters.searchValue,
          minAge: state.filters.minAge,
          maxAge: state.filters.maxAge,
          breed: state.filters.searchValue,
          species: state.filters.species,
          minPrice: state.filters.minPrice,
          maxPrice: state.filters.maxPrice,
        },
      });

      if (
        !response.data.errors &&
        response.data &&
        Array.isArray(response.data)
      ) {
        dispatch({
          type: GlobalActionType.GET_AVAILABLE_PETS,
          payload: response.data,
        });

        handleCloseFilterModal();
      } else {
        console.error("Invalid API response format:", response.data);

        if (response.data.errors) {
          // Store the property name and error message for each field
          const errors = response.data.errors.reduce(
            (
              acc: Record<string, string>,
              error: { propertyName: string; errorMessage: string }
            ) => {
              if (!acc[error.propertyName]) {
                acc[error.propertyName] = error.errorMessage;
              }
              return acc;
            },
            {}
          );

          // Set error messages
          dispatch({
            type: GlobalActionType.SET_PET_FILTERS_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch pets failed",
        });
      }
    } catch (error: any) {
      console.error("Error fetching pets:", error);

      if (error?.response?.data?.errors) {
        // Store the property name and error message for each field
        const errors = error?.response?.data?.errors?.reduce(
          (
            acc: Record<string, string>,
            error: { propertyName: string; errorMessage: string }
          ) => {
            if (!acc[error.propertyName]) {
              acc[error.propertyName] = error.errorMessage;
            }
            return acc;
          },
          {}
        );

        // Set error messages
        dispatch({
          type: GlobalActionType.SET_PET_FILTERS_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch pets failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchSpecies = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get("/get-species", {
        params: {
          speciesId: "",
          name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ALL_SPECIES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch species failed",
        });
      }
    } catch (error) {
      console.error("Error fetching species:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch species failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setFilters = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_PET_FILTER,
      payload: { name, value },
    });
  };

  const resetFilters = () => {
    dispatch({
      type: GlobalActionType.RESET_PET_FILTERS,
    });
  };

  const fetchPetDetail = async (slug: string) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(`/adoption-list/${slug}`);

      if (response.data && response.data.petId) {
        dispatch({
          type: GlobalActionType.GET_PET_DETAIL,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch pet detail failed",
        });
      }
    } catch (error) {
      console.error("Error fetching pet detail:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch pet detail failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setNewPet = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_NEW_PET,
      payload: { name, value },
    });
  };

  const resetNewPet = () => {
    dispatch({
      type: GlobalActionType.RESET_NEW_PET,
    });
  };

  const addNewPet = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_NEW_PET_ERROR_MESSAGES,
    });

    try {
      const response = await api.post(`/input-new-pets`, state.newPet);

      if (!response.data.errors) {
        dispatch({
          type: GlobalActionType.ADD_NEW_PET,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_PET,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          handleCloseMessageModal();
          router.push("/my-pets");
        }, 3000);
      } else {
        console.error("Invalid API response format:", response.data);

        if (response.data.errors) {
          // Store the property name and error message for each field
          const errors = response.data.errors.reduce(
            (
              acc: Record<string, string>,
              error: { propertyName: string; errorMessage: string }
            ) => {
              if (!acc[error.propertyName]) {
                acc[error.propertyName] = error.errorMessage;
              }
              return acc;
            },
            {}
          );

          // Set error messages
          dispatch({
            type: GlobalActionType.SET_NEW_PET_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Add new pet failed",
        });
      }
    } catch (error: any) {
      console.error("Error adding new pet:", error);

      if (error?.response?.data?.errors) {
        // Store the property name and error message for each field
        const errors = error?.response?.data?.errors?.reduce(
          (
            acc: Record<string, string>,
            error: { propertyName: string; errorMessage: string }
          ) => {
            if (!acc[error.propertyName]) {
              acc[error.propertyName] = error.errorMessage;
            }
            return acc;
          },
          {}
        );

        if (errors === null) {
          alert("hello");
        }

        // Set error messages
        dispatch({
          type: GlobalActionType.SET_NEW_PET_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Add new pet failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const editPet = async (petId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_NEW_PET_ERROR_MESSAGES,
    });

    try {
      const response = await api.put(`/edit-pet/${petId}`, state.newPet);

      if (!response.data.errors) {
        dispatch({
          type: GlobalActionType.EDIT_PET,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_PET,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          handleCloseMessageModal();
          router.push("/my-pets");
        }, 3000);
      } else {
        console.error("Invalid API response format:", response.data);

        if (response.data.errors) {
          // Store the property name and error message for each field
          const errors = response.data.errors.reduce(
            (
              acc: Record<string, string>,
              error: { propertyName: string; errorMessage: string }
            ) => {
              if (!acc[error.propertyName]) {
                acc[error.propertyName] = error.errorMessage;
              }
              return acc;
            },
            {}
          );

          // Set error messages
          dispatch({
            type: GlobalActionType.SET_NEW_PET_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Edit pet failed",
        });
      }
    } catch (error: any) {
      console.error("Error updating pet:", error);

      if (error?.response?.data?.errors) {
        // Store the property name and error message for each field
        const errors = error?.response?.data?.errors?.reduce(
          (
            acc: Record<string, string>,
            error: { propertyName: string; errorMessage: string }
          ) => {
            if (!acc[error.propertyName]) {
              acc[error.propertyName] = error.errorMessage;
            }
            return acc;
          },
          {}
        );

        // Set error messages
        dispatch({
          type: GlobalActionType.SET_NEW_PET_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Edit pet failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const removePet = async (petId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.delete(`/remove-pet/${petId}`);

      if (response.data) {
        dispatch({
          type: GlobalActionType.REMOVE_PET,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          router.push("/my-pets");
        }, 3000);
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Remove pet failed",
        });
      }
    } catch (error) {
      console.error("Error removing pet:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Remove pet failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchOwnerPets = async (ownerId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });
    dispatch({ type: GlobalActionType.SET_ERROR, payload: null });

    try {
      const response = await api.get(`/get-owner-pets/${ownerId}`);

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_OWNER_PETS,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch owner pets failed",
        });
      }
    } catch (error) {
      console.error("Error fetching owner pets:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch owner pets failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const isIPet = (item: IPet | IService): item is IPet => {
    return "species" in item;
  };

  return (
    <PetsContext.Provider
      value={{
        species: state.species,
        pets: state.pets,
        ownerPets: state.ownerPets,
        pet: state.pet,
        newPet: state.newPet,
        filters: state.filters,
        petFiltersErrorMessages: state.petFiltersErrorMessages,
        newPetErrorMessages: state.newPetErrorMessages,
        setFilters,
        resetFilters,
        fetchPets,
        fetchSpecies,
        fetchPetDetail,
        setNewPet,
        resetNewPet,
        addNewPet,
        editPet,
        removePet,
        fetchOwnerPets,
        isIPet,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error("usePets must be used within a PetsProvider");
  }
  return context;
}
