import { IPet } from "../interface/pet/IPet";
import { IRole } from "../interface/user/IRole";
import { IService } from "../interface/service/IService";
import { IServiceCategory } from "../interface/service/IServiceCategory";
import { ISpecies } from "../interface/pet/ISpecies";
import { ITransaction } from "../interface/transaction/ITransaction";
import { IUser } from "../interface/user/IUser";
import { IForumPost } from "../interface/forum/IForumPost";
import { IForumCategory } from "../interface/forum/IForumCategory";
import { IForumComment } from "../interface/forum/IForumComment";
import { IAdoptionTransaction } from "../interface/transaction/IAdoptionTransaction";
import { IServiceTransaction } from "../interface/transaction/IServiceTransaction";

export enum GlobalActionType {
  // Global
  SET_MESSAGE_MODAL = "SET_MESSAGE_MODAL",
  SET_FILTER_MODAL = "SET_FILTER_MODAL",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",

  // Users
  SET_USER_REGISTER = "SET_USER_REGISTER",
  RESET_USER_REGISTER = "RESET_USER_REGISTER",
  SET_USER_LOGIN = "SET_USER_LOGIN",
  RESET_USER_LOGIN = "RESET_USER_LOGIN",
  LOGIN_USER = "LOGIN_USER",
  LOGOUT_USER = "LOGOUT_USER",
  GET_LOGGED_IN_USER = "GET_LOGGED_IN_USER",
  GET_USER_ROLES = "GET_USER_ROLES",
  REGISTER_USER = "REGISTER_USER",
  SET_REGISTER_ERROR_MESSAGES = "SET_REGISTER_ERROR_MESSAGES",
  RESET_REGISTER_ERROR_MESSAGES = "RESET_REGISTER_ERROR_MESSAGES",
  SET_LOGGED_IN = "SET_LOGGED_IN",

  // Pets
  GET_AVAILABLE_PETS = "GET_AVAILABLE_PETS",
  GET_ALL_SPECIES = "GET_ALL_SPECIES",
  SET_PET_FILTER = "SET_PET_FILTER",
  RESET_PET_FILTERS = "RESTE_PET_FILTERS",
  GET_PET_DETAIL = "GET_PET_DETAIL",
  SET_NEW_PET = "SET_NEW_PET",
  RESET_NEW_PET = "RESET_NEW_PET",
  ADD_NEW_PET = "ADD_NEW_PET",
  EDIT_PET = "EDIT_PET",
  REMOVE_PET = "REMOVE_PET",
  GET_OWNER_PETS = "GET_OWNER_PETS",

  // Adoptions
  ADOPT_PET = "ADOPT_PET",
  GET_USER_ADOPTIONS = "GET_USER_ADOPTIONS",
  GET_ADOPTION_REQUESTS = "GET_ADOPTION_REQUESTS",
  ACCEPT_PET_ADOPTION = "ACCEPT_PET_ADOPTION",
  REJECT_PET_ADOPTION = "REJECT_PET_ADOPTION",

  // Services
  GET_ALL_SERVICES = "GET_ALL_SERVICES",
  GET_ALL_SERVICE_CATEGORIES = "GET_ALL_SERVICE_CATEGORIES",
  SET_SERVICE_FILTER = "SET_SERVICE_FILTER",
  RESET_SERVICE_FILTERS = "RESET_SERVICE_FILTERS",
  GET_SERVICE_DETAIL = "GET_SERVICE_DETAIL",
  BOOK_SERVICE = "BOOK_SERVICE",
  SET_NEW_SERVICE = "SET_NEW_SERVICE",
  RESET_NEW_SERVICE = "RESET_NEW_SERVICE",
  ADD_NEW_SERVICE = "ADD_NEW_SERVICE",
  EDIT_SERVICE = "EDIT_SERVICE",
  REMOVE_SERVICE = "REMOVE_SERVICE",
  GET_PROVIDER_SERVICES = "GET_PROVIDER_SERVICES",

  // Transactions
  SET_TRANSACTION_TYPE = "SET_TRANSACTION_TYPE",
  GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY",
  GET_ADOPTION_TRANSACTION_DETAIL = "GET_ADOPTION_TRANSACTION_DETAIL",
  GET_SERVICE_TRANSACTION_DETAIL = "GET_SERVICE_TRANSACTION_DETAIL",
  GET_ADOPTION_TRANSACTION_REQUEST = "GET_ADOPTION_TRANSACTION_REQUEST",
  GET_SERVICE_TRANSACTION_REQUEST = "GET_SERVICE_TRANSACTION_REQUEST",
  GET_TRANSACTION_DETAIL = "GET_TRANSACTION_DETAIL",

  // Forums
  GET_FORUM_CATEGORIES = "GET_ALL_FORUM_CATEGORIES",
  SET_FORUM_CATEGORY_ID = "SET_FORUM_CATEGORY_ID",
  GET_FORUM_POSTS = "GET_FORUM_POSTS",
  GET_FORUM_POST_DETAIL = "GET_FORUM_POST_DETAIL",
  GET_FORUM_COMMENTS = "GET_FORUM_COMMENTS",
  SET_NEW_FORUM_POST = "SET_NEW_FORUM_POST",
  RESET_NEW_FORUM_POST = "RESET_NEW_FORUM_POST",
  SET_NEW_FORUM_ERROR_MESSAGES = "SET_NEW_FORUM_ERROR_MESSAGES",
  RESET_NEW_FORUM_ERROR_MESSAGES = "RESET_NEW_FORUM_ERROR_MESSAGES",
  SET_NEW_FORUM_COMMENT = "SET_NEW_FORUM_COMMENT",
  RESET_NEW_FORUM_COMMENT = "RESET_NEW_FORUM_COMMENT",
  ADD_FORUM_POST = "ADD_FORUM_POST",
  ADD_FORUM_COMMENT = "ADD_FORUM_COMMENT",
}

export type GlobalAction =
  // Global
  | { type: GlobalActionType.SET_MESSAGE_MODAL; payload: boolean }
  | { type: GlobalActionType.SET_FILTER_MODAL; payload: boolean }
  | { type: GlobalActionType.SET_LOADING; payload: boolean }
  | { type: GlobalActionType.SET_ERROR; payload: string | null }

  // Users, Register, Login
  | {
      type: GlobalActionType.SET_USER_REGISTER;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_USER_REGISTER;
    }
  | {
      type: GlobalActionType.SET_USER_LOGIN;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.RESET_USER_LOGIN;
    }
  | {
      type: GlobalActionType.LOGIN_USER;
      payload: IUser;
    }
  | {
      type: GlobalActionType.LOGOUT_USER;
    }
  | { type: GlobalActionType.REGISTER_USER }
  | {
      type: GlobalActionType.SET_REGISTER_ERROR_MESSAGES;
      payload: Record<string, string>;
    }
  | {
      type: GlobalActionType.RESET_REGISTER_ERROR_MESSAGES;
    }
  | { type: GlobalActionType.GET_LOGGED_IN_USER; payload: IUser }
  | {
      type: GlobalActionType.GET_USER_ROLES;
      payload: IRole[];
    }
  | { type: GlobalActionType.SET_LOGGED_IN; payload: boolean }

  // Pets
  | {
      type: GlobalActionType.GET_AVAILABLE_PETS;
      payload: IPet[];
    }
  | {
      type: GlobalActionType.GET_ALL_SPECIES;
      payload: ISpecies[];
    }
  | {
      type: GlobalActionType.SET_PET_FILTER;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.RESET_PET_FILTERS;
    }
  | {
      type: GlobalActionType.GET_PET_DETAIL;
      payload: IPet;
    }
  | {
      type: GlobalActionType.SET_NEW_PET;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_NEW_PET;
    }
  | {
      type: GlobalActionType.ADD_NEW_PET;
    }
  | {
      type: GlobalActionType.EDIT_PET;
    }
  | {
      type: GlobalActionType.REMOVE_PET;
    }
  | {
      type: GlobalActionType.GET_OWNER_PETS;
      payload: IPet[];
    }

  // Adoptions
  | {
      type: GlobalActionType.ADOPT_PET;
    }

  // Services
  | {
      type: GlobalActionType.GET_ALL_SERVICES;
      payload: IService[];
    }
  | {
      type: GlobalActionType.GET_ALL_SERVICE_CATEGORIES;
      payload: IServiceCategory[];
    }
  | {
      type: GlobalActionType.SET_SERVICE_FILTER;
      payload: { name: string; value: string };
    }
  | {
      type: GlobalActionType.RESET_SERVICE_FILTERS;
    }
  | {
      type: GlobalActionType.GET_SERVICE_DETAIL;
      payload: IService;
    }
  | {
      type: GlobalActionType.BOOK_SERVICE;
    }
  | {
      type: GlobalActionType.SET_NEW_SERVICE;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_NEW_SERVICE;
    }
  | {
      type: GlobalActionType.ADD_NEW_SERVICE;
    }
  | {
      type: GlobalActionType.EDIT_SERVICE;
    }
  | {
      type: GlobalActionType.REMOVE_SERVICE;
    }
  | {
      type: GlobalActionType.GET_PROVIDER_SERVICES;
      payload: IService[];
    }

  // Transactions
  | {
      type: GlobalActionType.SET_TRANSACTION_TYPE;
      payload: string;
    }
  | {
      type: GlobalActionType.GET_TRANSACTION_HISTORY;
      payload: ITransaction[];
    }
  | {
      type: GlobalActionType.GET_ADOPTION_TRANSACTION_DETAIL;
      payload: IAdoptionTransaction;
    }
  | {
      type: GlobalActionType.GET_SERVICE_TRANSACTION_DETAIL;
      payload: IServiceTransaction;
    }
  | {
      type: GlobalActionType.GET_ADOPTION_TRANSACTION_REQUEST;
      payload: IAdoptionTransaction[];
    }
  | {
      type: GlobalActionType.GET_SERVICE_TRANSACTION_REQUEST;
      payload: IServiceTransaction[];
    }

  // Forums
  | {
      type: GlobalActionType.GET_FORUM_CATEGORIES;
      payload: IForumCategory[];
    }
  | {
      type: GlobalActionType.SET_FORUM_CATEGORY_ID;
      payload: number;
    }
  | {
      type: GlobalActionType.GET_FORUM_POSTS;
      payload: IForumPost[];
    }
  | {
      type: GlobalActionType.GET_FORUM_POST_DETAIL;
      payload: IForumPost;
    }
  | {
      type: GlobalActionType.GET_FORUM_COMMENTS;
      payload: IForumComment[];
    }
  | {
      type: GlobalActionType.SET_NEW_FORUM_POST;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_NEW_FORUM_POST;
    }
  | {
      type: GlobalActionType.SET_NEW_FORUM_ERROR_MESSAGES;
      payload: string[];
    }
  | {
      type: GlobalActionType.RESET_NEW_FORUM_ERROR_MESSAGES;
    }
  | {
      type: GlobalActionType.SET_NEW_FORUM_COMMENT;
      payload: { name: string; value: string | number };
    }
  | {
      type: GlobalActionType.RESET_NEW_FORUM_COMMENT;
    }
  | {
      type: GlobalActionType.ADD_FORUM_POST;
    }
  | {
      type: GlobalActionType.ADD_FORUM_COMMENT;
    };
