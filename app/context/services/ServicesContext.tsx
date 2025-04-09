"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import api from "@/lib/apiClient";
import IServiceCategory from "@/app/interface/service/IServiceCategory";
import IService from "@/app/interface/service/IService";
import IServiceFilterParams from "@/app/interface/service/IServiceFilterParams";
import { initialState, ServicesReducer } from "./ServicesReducer";
import { GlobalActionType } from "../GlobalActions";
import INewService from "@/app/interface/service/INewService";
import { useGlobal } from "../GlobalContext";
import { useRouter } from "expo-router";
import INewServiceErrorMessage from "@/app/interface/service/INewServiceErrorMessage";
import IServiceFilterErrorMessage from "@/app/interface/service/IServiceFiltersErrorMessage";
import IPet from "@/app/interface/pet/IPet";

interface ServicesContextType {
  service_categories: IServiceCategory[];
  services: IService[];
  providerServices: IService[];
  service: IService;
  newService: INewService;
  filters: IServiceFilterParams;
  serviceFiltersErrorMessages: IServiceFilterErrorMessage;
  newServiceErrorMessages: INewServiceErrorMessage;
  setFilters: (name: string, value: string) => void;
  resetFilters: () => void;
  fetchServices: () => Promise<void>;
  fetchServiceCategories: () => Promise<void>;
  fetchServiceDetail: (slug: string) => Promise<void>;
  bookService: (
    adopterId: number,
    providerId: number,
    serviceId: number,
    bookingDate: string
  ) => Promise<void>;
  setNewService: (name: string, value: string | number) => void;
  resetNewService: () => void;
  addNewService: () => Promise<void>;
  editService: (serviceId: number) => Promise<void>;
  removeService: (serviceId: number) => Promise<void>;
  fetchProviderServices: (providerId: number) => Promise<void>;
  isIService: (item: IPet | IService) => item is IService;
  loading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ServicesReducer, initialState);

  const {
    handleOpenMessageModal,
    handleCloseMessageModal,
    handleCloseFilterModal,
  } = useGlobal();
  const router = useRouter();

  const fetchServices = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_SERVICE_FILTERS_ERROR_MESSAGES,
    });

    try {
      const response = await api.get("/services-list", {
        params: {
          name: state.filters.searchValue,
          city: state.filters.searchValue,
          categoryName: state.filters.categoryName,
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
          type: GlobalActionType.GET_ALL_SERVICES,
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
            type: GlobalActionType.SET_SERVICE_FILTERS_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch Service List failed",
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
          type: GlobalActionType.SET_SERVICE_FILTERS_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch Service List failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchServiceCategories = async () => {
    try {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

      const response = await api.get("/get-service-categories", {
        params: {
          categoryId: "",
          name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_ALL_SERVICE_CATEGORIES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch Service Categories failed",
        });
      }
    } catch (error) {
      console.error("Error fetching service categories:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch Service Categories failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setFilters = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_SERVICE_FILTER,
      payload: { name, value },
    });
  };

  const resetFilters = () => {
    dispatch({
      type: GlobalActionType.RESET_SERVICE_FILTERS,
    });
  };

  const fetchServiceDetail = async (slug: string) => {
    try {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

      const response = await api.get(`/service-list/${slug}`);

      if (response.data && response.data.serviceId) {
        dispatch({
          type: GlobalActionType.GET_SERVICE_DETAIL,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch Service Detail failed",
        });
      }
    } catch (error) {
      console.error("Error fetching service detail:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch Service Detail failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const bookService = async (
    adopterId: number,
    providerId: number,
    serviceId: number,
    bookingDate: string
  ) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.post("/service-transaction", {
        adopterId,
        providerId,
        serviceId,
        bookingDate,
      });

      if (response.data) {
        console.log("Booking successful");
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Booking failed",
        });
      }
    } catch (error) {
      console.error("Error booking service:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Booking failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setNewService = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_NEW_SERVICE,
      payload: { name, value },
    });
  };

  const resetNewService = () => {
    dispatch({
      type: GlobalActionType.RESET_NEW_SERVICE,
    });
  };

  const addNewService = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_NEW_SERVICE_ERROR_MESSAGES,
    });

    try {
      const response = await api.post(`/input-new-services`, state.newService);

      if (!response.data.errors) {
        dispatch({
          type: GlobalActionType.ADD_NEW_SERVICE,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_SERVICE,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          handleCloseMessageModal();
          router.push("/my-services");
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
            type: GlobalActionType.SET_NEW_SERVICE_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Add new service failed",
        });
      }
    } catch (error: any) {
      console.error("Error adding new service:", error);

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
          type: GlobalActionType.SET_NEW_SERVICE_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Add new service failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const editService = async (serviceId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_NEW_SERVICE_ERROR_MESSAGES,
    });

    try {
      const response = await api.put(
        `/edit-service/${serviceId}`,
        state.newService
      );

      if (response.data) {
        dispatch({
          type: GlobalActionType.EDIT_SERVICE,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_SERVICE,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          handleCloseMessageModal();
          router.push("/my-services");
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
            type: GlobalActionType.SET_NEW_SERVICE_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Edit service failed",
        });
      }
    } catch (error: any) {
      console.error("Error updating service:", error);

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
          type: GlobalActionType.SET_NEW_SERVICE_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Edit service failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const removeService = async (serviceId: number) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.delete(`/remove-service/${serviceId}`);

      if (response.data) {
        dispatch({
          type: GlobalActionType.REMOVE_SERVICE,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          router.push("/my-services");
        }, 3000);
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Remove service failed",
        });
      }
    } catch (error) {
      console.error("Error removing service:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Remove service failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchProviderServices = async (providerId: number) => {
    try {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: true });
      dispatch({ type: GlobalActionType.SET_ERROR, payload: null });

      const response = await api.get(`/get-provider-services/${providerId}`);

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_PROVIDER_SERVICES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch provider services failed",
        });
      }
    } catch (error) {
      console.error("Error fetching provider services:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch provider services failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const isIService = (item: IPet | IService): item is IService => {
    return "category" in item;
  };

  return (
    <ServicesContext.Provider
      value={{
        service_categories: state.service_categories,
        services: state.services,
        providerServices: state.providerServices,
        service: state.service,
        newService: state.newService,
        filters: state.filters,
        serviceFiltersErrorMessages: state.serviceFiltersErrorMessages,
        newServiceErrorMessages: state.newServiceErrorMessages,
        setFilters,
        resetFilters,
        fetchServices,
        fetchServiceCategories,
        fetchServiceDetail,
        bookService,
        setNewService,
        resetNewService,
        addNewService,
        editService,
        removeService,
        fetchProviderServices,
        isIService,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}
