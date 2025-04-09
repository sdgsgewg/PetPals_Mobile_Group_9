import IRole from "@/app/interface/user/IRole";
import IUser from "@/app/interface/user/IUser";
import { GlobalAction, GlobalActionType } from "../GlobalActions";
import IUserRegister from "@/app/interface/auth/IUserRegister";
import IUserLogin from "@/app/interface/auth/IUserLogin";
import IRegisterErrorMessage from "@/app/interface/auth/IRegisterErrorMessage";
import ILoginErrorMessage from "@/app/interface/auth/ILoginErrorMessage";

export interface UserState {
  user: IUser;
  userRegister: IUserRegister;
  userLogin: IUserLogin;
  loggedInUser: IUser;
  roles: IRole[];
  isLoggedIn: boolean;
  registerErrorMessages: IRegisterErrorMessage;
  loginErrorMessages: ILoginErrorMessage;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  user: {} as IUser,
  userRegister: {} as IUserRegister,
  userLogin: {} as IUserLogin,
  loggedInUser: {} as IUser,
  roles: [],
  loading: false,
  error: null,
  isLoggedIn: false,
  registerErrorMessages: {
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
    Address: "",
    City: "",
    RoleId: "",
  },
  loginErrorMessages: {
    Email: "",
    Password: "",
  },
};

export function UsersReducer(state: UserState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.SET_USER_REGISTER:
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_USER_REGISTER:
      return {
        ...state,
        userRegister: {
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          city: "",
          roleId: 0,
        },
      };
    case GlobalActionType.SET_USER_LOGIN:
      return {
        ...state,
        userLogin: {
          ...state.userLogin,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_USER_LOGIN:
      return {
        ...state,
        userLogin: {
          email: "",
          password: "",
        },
      };
    case GlobalActionType.LOGIN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
        isLoggedIn: true,
      };
    case GlobalActionType.LOGOUT_USER:
      return {
        ...state,
        loggedInUser: {} as IUser,
        isLoggedIn: false,
      };
    case GlobalActionType.REGISTER_USER:
      return { ...state, loading: false, error: null };
    case GlobalActionType.SET_REGISTER_ERROR_MESSAGES:
      return {
        ...state,
        registerErrorMessages: {
          ...state.registerErrorMessages,
          ...action.payload,
        },
      };
    case GlobalActionType.RESET_REGISTER_ERROR_MESSAGES:
      return {
        ...state,
        registerErrorMessages: {
          Name: "",
          Email: "",
          Password: "",
          Phone: "",
          Address: "",
          City: "",
          RoleId: "",
        },
      };
    case GlobalActionType.SET_LOGIN_ERROR_MESSAGES:
      return {
        ...state,
        loginErrorMessages: {
          ...state.loginErrorMessages,
          ...action.payload,
        },
      };
    case GlobalActionType.RESET_LOGIN_ERROR_MESSAGES:
      return {
        ...state,
        loginErrorMessages: {
          Email: "",
          Password: "",
        },
      };
    case GlobalActionType.GET_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case GlobalActionType.GET_USER_ROLES:
      return { ...state, roles: action.payload };
    case GlobalActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case GlobalActionType.SET_ERROR:
      return { ...state, error: action.payload };
    case GlobalActionType.SET_LOGGED_IN:
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
}
