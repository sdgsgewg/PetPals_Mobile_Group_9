"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/apiClient";
import { IUser } from "@/app/interface/user/IUser";
import { IRole } from "@/app/interface/user/IRole";
import { initialState, UsersReducer } from "./UsersReducer";
import { GlobalActionType } from "../GlobalActions";
import { IUserRegister } from "@/app/interface/auth/IUserRegister";
import { IUserLogin } from "@/app/interface/auth/IUserLogin";
import { useRouter } from "expo-router";
import { IRegisterErrorMessage } from "@/app/interface/auth/IRegisterErrorMessage";

interface UsersContextType {
  user: IUser;
  userRegister: IUserRegister;
  userLogin: IUserLogin;
  loggedInUser: IUser;
  roles: IRole[];
  isLoggedIn: boolean;
  registerErrorMessages: IRegisterErrorMessage;
  fetchRoles: () => Promise<void>;
  setUserRegister: (name: string, value: string) => void;
  registerUser: () => Promise<void>;
  setUserLogin: (name: string, value: string) => void;
  loginUser: () => Promise<void>;
  logoutUser: () => void;
  loading: boolean;
  error: string | null;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(UsersReducer, initialState);
  const router = useRouter();

  const fetchRoles = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get("/get-user-roles", {
        params: {
          RoleId: "",
          Name: "",
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_USER_ROLES,
          payload: response.data,
        });
      } else {
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: response?.data?.message || "Registration failed",
        });
      }
    } catch (error) {
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch Role failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setUserRegister = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_USER_REGISTER,
      payload: { name, value },
    });
  };

  const registerUser = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });
    dispatch({ type: GlobalActionType.RESET_REGISTER_ERROR_MESSAGES });

    try {
      const response = await api.post("/register-petpals", state.userRegister);

      if (!response.data.errors) {
        alert("Registration successful");

        dispatch({ type: GlobalActionType.RESET_USER_REGISTER });
        router.push("/auth/login");
      } else {
        if (response.data.errors) {
          const errors = response.data.errors.reduce(
            (
              acc: Record<string, string>,
              error: { propertyName: string; errorMessage: string }
            ) => {
              acc[error.propertyName] = error.errorMessage;
              return acc;
            },
            {}
          );

          dispatch({
            type: GlobalActionType.SET_REGISTER_ERROR_MESSAGES,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Registration failed",
        });
      }
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        const errors = error.response.data.errors.reduce(
          (
            acc: Record<string, string>,
            err: { propertyName: string; errorMessage: string }
          ) => {
            acc[err.propertyName] = err.errorMessage;
            return acc;
          },
          {}
        );

        dispatch({
          type: GlobalActionType.SET_REGISTER_ERROR_MESSAGES,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Registration failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setUserLogin = (name: string, value: string) => {
    dispatch({
      type: GlobalActionType.SET_USER_LOGIN,
      payload: { name, value },
    });
  };

  const loginUser = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.post("/login-petpals", state.userLogin);

      if (response.data) {
        alert("Login successful");

        const token = response.data.token;
        const userData = response.data.user;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(userData));

        dispatch({
          type: GlobalActionType.LOGIN_USER,
          payload: userData,
        });

        dispatch({ type: GlobalActionType.RESET_USER_LOGIN });

        dispatch({
          type: GlobalActionType.SET_LOGGED_IN,
          payload: true,
        });

        router.push("/");
      } else {
        alert("Login Failed");
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Login failed",
        });
      }
    } catch (error) {
      console.error("Error login user:", error);
      alert("Login Failed");
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Login failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("loggedInUser");

    dispatch({
      type: GlobalActionType.SET_LOGGED_IN,
      payload: false,
    });

    dispatch({
      type: GlobalActionType.LOGOUT_USER,
    });
  };

  useEffect(() => {
    const restoreUser = async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUser");
      if (storedUser) {
        dispatch({
          type: GlobalActionType.LOGIN_USER,
          payload: JSON.parse(storedUser),
        });
        dispatch({
          type: GlobalActionType.SET_LOGGED_IN,
          payload: true,
        });
      }
    };

    restoreUser();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        user: state.user,
        userRegister: state.userRegister,
        userLogin: state.userLogin,
        loggedInUser: state.loggedInUser,
        roles: state.roles,
        registerErrorMessages: state.registerErrorMessages,
        fetchRoles,
        setUserRegister,
        registerUser,
        setUserLogin,
        loginUser,
        logoutUser,
        loading: state.loading,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
