"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import api from "@/lib/apiClient";
import IUser from "@/app/interface/user/IUser";
import IRole from "@/app/interface/user/IRole";
import { initialState, UsersReducer } from "./UsersReducer";
import { GlobalActionType } from "../GlobalActions";
import IUserRegister from "@/app/interface/auth/IUserRegister";
import IUserLogin from "@/app/interface/auth/IUserLogin";
import { useRouter } from "expo-router";
import IRegisterErrorMessage from "@/app/interface/auth/IRegisterErrorMessage";
import ILoginErrorMessage from "@/app/interface/auth/ILoginErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UsersContextType {
  user: IUser;
  userRegister: IUserRegister;
  userLogin: IUserLogin;
  loggedInUser: IUser;
  roles: IRole[];
  isLoggedIn: boolean;
  registerErrorMessages: IRegisterErrorMessage;
  loginErrorMessages: ILoginErrorMessage;
  fetchRoles: () => Promise<void>;
  setUserRegister: (name: string, value: string) => void;
  registerUser: () => Promise<void>;
  setUserLogin: (name: string, value: string) => void;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
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
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: response?.data?.message || "Registration failed",
        });
      }
    } catch (error) {
      console.error("Error fetching user roles:", error);
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

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_REGISTER_ERROR_MESSAGES,
    });

    try {
      const response = await api.post("/register-petpals", state.userRegister);

      if (!response.data.errors) {
        dispatch({
          type: GlobalActionType.RESET_USER_REGISTER,
        });

        alert("Registration successful");
        router.push("/auth/login");
      } else {
        console.error("Invalid API response format:", response.data);

        if (response.data.errors) {
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
      console.error("Error register user:", error?.response?.data);

      if (error?.response?.data?.errors) {
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

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_LOGIN_ERROR_MESSAGES,
    });

    try {
      const response = await api.post("/login-petpals", state.userLogin);

      if (!response.data.errors && response.data.token && response.data.user) {
        const token = response.data.token;
        const userData = response.data.user;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(userData));

        dispatch({
          type: GlobalActionType.LOGIN_USER,
          payload: userData,
        });

        dispatch({
          type: GlobalActionType.RESET_USER_LOGIN,
        });

        dispatch({
          type: GlobalActionType.SET_LOGGED_IN,
          payload: true,
        });

        alert("Login successful");
        router.push("/");
      } else {
        console.error("Invalid API response format:", response.data);

        if (response.data.errors) {
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

          dispatch({
            type: GlobalActionType.SET_LOGIN_ERROR_MESSAGES,
            payload: errors,
          });
        }

        alert("Login Failed");
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Login failed",
        });
      }
    } catch (error: any) {
      console.error("Error login user:", error?.response?.data);

      if (error?.response?.data?.errors) {
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

        dispatch({
          type: GlobalActionType.SET_LOGIN_ERROR_MESSAGES,
          payload: errors,
        });
      }

      if (error?.response?.status === 401) {
        alert(error?.response?.data?.detail);
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Login failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const logoutUser = async () => {
    dispatch({
      type: GlobalActionType.SET_LOGGED_IN,
      payload: false,
    });

    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("loggedInUser");

    dispatch({
      type: GlobalActionType.LOGOUT_USER,
    });
  };

  useEffect(() => {
    const loadStoredUser = async () => {
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

    loadStoredUser();
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
        loginErrorMessages: state.loginErrorMessages,
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
