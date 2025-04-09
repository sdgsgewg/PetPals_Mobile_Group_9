import IService from "@/app/interface/service/IService";
import IServiceCategory from "@/app/interface/service/IServiceCategory";
import IServiceFilterParams from "@/app/interface/service/IServiceFilterParams";
import { GlobalAction, GlobalActionType } from "../GlobalActions";
import INewService from "@/app/interface/service/INewService";
import INewServiceErrorMessage from "@/app/interface/service/INewServiceErrorMessage";
import IServiceFilterErrorMessage from "@/app/interface/service/IServiceFiltersErrorMessage";

export interface ServiceState {
  service_categories: IServiceCategory[];
  services: IService[];
  providerServices: IService[];
  filters: IServiceFilterParams;
  serviceFiltersErrorMessages: IServiceFilterErrorMessage;
  service: IService;
  newService: INewService;
  newServiceErrorMessages: INewServiceErrorMessage;
  loading: boolean;
  error: string | null;
}

export const initialState: ServiceState = {
  service_categories: [],
  services: [],
  providerServices: [],
  filters: {
    searchValue: "",
    categoryName: "",
    minPrice: "",
    maxPrice: "",
  } as IServiceFilterParams,
  serviceFiltersErrorMessages: {
    SearchValue: "",
    CategoryName: "",
    MinPrice: "",
    MaxPrice: "",
  },
  service: {} as IService,
  newService: {} as INewService,
  newServiceErrorMessages: {
    Name: "",
    CategoryId: "",
    Price: "",
    Address: "",
    City: "",
    ProviderId: "",
  },
  loading: false,
  error: null,
};

export function ServicesReducer(state: ServiceState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.GET_ALL_SERVICES:
      return { ...state, services: action.payload };
    case GlobalActionType.GET_ALL_SERVICE_CATEGORIES:
      return { ...state, service_categories: action.payload };
    case GlobalActionType.SET_SERVICE_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_SERVICE_FILTERS:
      return {
        ...state,
        filters: {
          searchValue: "",
          categoryName: "",
          minPrice: "",
          maxPrice: "",
        },
      };
    case GlobalActionType.SET_SERVICE_FILTERS_ERROR_MESSAGES:
      return {
        ...state,
        serviceFiltersErrorMessages: {
          ...state.serviceFiltersErrorMessages,
          ...action.payload,
        },
      };
    case GlobalActionType.RESET_SERVICE_FILTERS_ERROR_MESSAGES:
      return {
        ...state,
        serviceFiltersErrorMessages: {
          SearchValue: "",
          CategoryName: "",
          MinPrice: "",
          MaxPrice: "",
        },
      };
    case GlobalActionType.GET_SERVICE_DETAIL:
      return { ...state, service: action.payload };
    case GlobalActionType.BOOK_SERVICE:
      return { ...state };
    case GlobalActionType.SET_NEW_SERVICE:
      return {
        ...state,
        newService: {
          ...state.newService,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_NEW_SERVICE:
      return {
        ...state,
        newService: {
          serviceId: 0,
          providerId: 0,
          name: "",
          categoryId: 0,
          description: "",
          price: 0,
          address: "",
          city: "",
          createdBy: "",
        },
      };
    case GlobalActionType.SET_NEW_SERVICE_ERROR_MESSAGES:
      return {
        ...state,
        newServiceErrorMessages: {
          ...state.newServiceErrorMessages,
          ...action.payload,
        },
      };
    case GlobalActionType.RESET_NEW_SERVICE_ERROR_MESSAGES:
      return {
        ...state,
        newServiceErrorMessages: {
          Name: "",
          CategoryId: "",
          Price: "",
          Address: "",
          City: "",
          ProviderId: "",
        },
      };
    case GlobalActionType.ADD_NEW_SERVICE:
      return { ...state };
    case GlobalActionType.EDIT_SERVICE:
      return { ...state };
    case GlobalActionType.REMOVE_SERVICE:
      return { ...state };
    case GlobalActionType.GET_PROVIDER_SERVICES:
      return { ...state, providerServices: action.payload };
    case GlobalActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case GlobalActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
