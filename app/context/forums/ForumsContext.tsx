"use client";

import { createContext, ReactNode, useContext, useReducer } from "react";
import api from "@/lib/apiClient";
import { GlobalActionType } from "../GlobalActions";
import IForumCategory from "@/app/interface/forum/IForumCategory";
import IForumPost from "@/app/interface/forum/IForumPost";
import IForumComment from "@/app/interface/forum/IForumComment";
import { ForumsReducer, initialState } from "./ForumsReducer";
import INewForumPost from "@/app/interface/forum/INewForumPost";
import { useRouter } from "expo-router";
import INewForumComment from "@/app/interface/forum/INewForumComment";
import { useGlobal } from "../GlobalContext";
import INewForumPostErrorMessage from "@/app/interface/forum/INewForumPostErrorMessage";

interface ForumsContextType {
  forumCategories: IForumCategory[];
  forumCategoryId: number;
  forumPosts: IForumPost[];
  forumPost: IForumPost;
  newForumPost: INewForumPost;
  newForumPostErrorMessage: INewForumPostErrorMessage;
  forumComments: IForumComment[];
  newForumComment: INewForumComment;
  fetchForumCategories: () => Promise<void>;
  setForumCategoryId: (forumCategoryId: number) => void;
  fetchForumPosts: () => Promise<void>;
  fetchForumPostDetail: (slug: string) => Promise<void>;
  fetchForumPostComments: (forumPostId: number) => Promise<void>;
  setNewPost: (name: string, value: string | number) => void;
  resetNewPost: () => void;
  addForumPost: () => Promise<void>;
  setNewComment: (name: string, value: string | number) => void;
  resetNewComment: () => void;
  addForumComment: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ForumsContext = createContext<ForumsContextType | undefined>(undefined);

export function ForumsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ForumsReducer, initialState);

  const { handleOpenMessageModal, handleCloseMessageModal } = useGlobal();
  const router = useRouter();

  const fetchForumCategories = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(`/get-all-forum-categories`);

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_FORUM_CATEGORIES,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch forum categories failed",
        });
      }
    } catch (error) {
      console.error("Error fetching forum categories:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch forum categories failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setForumCategoryId = (forumCategoryId: number) => {
    dispatch({
      type: GlobalActionType.SET_FORUM_CATEGORY_ID,
      payload: forumCategoryId,
    });
  };

  const fetchForumPosts = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });
    dispatch({ type: GlobalActionType.SET_ERROR, payload: null });

    try {
      const response = await api.get(`/get-all-forum-posts`, {
        params: {
          forumCategoryId: state.forumCategoryId,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        dispatch({
          type: GlobalActionType.GET_FORUM_POSTS,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch forum posts failed",
        });
      }
    } catch (error) {
      console.error("Error fetching forum posts:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch forum posts failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchForumPostDetail = async (slug: string) => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(`/get-all-forum-posts/${slug}`);

      if (response.data) {
        dispatch({
          type: GlobalActionType.GET_FORUM_POST_DETAIL,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch forum post detail failed",
        });
      }
    } catch (error) {
      console.error("Error fetching forum post detail:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch forum post detail failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const fetchForumPostComments = async (forumPostId: number) => {
    if (!forumPostId) {
      return;
    }

    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.get(`/get-all-comment/${forumPostId}`);

      if (response.data && Array.isArray(response.data)) {
        console.log("Berhasil");
        dispatch({
          type: GlobalActionType.GET_FORUM_COMMENTS,
          payload: response.data,
        });
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Fetch forum comments failed",
        });
      }
    } catch (error) {
      console.error("Error fetching forum comments:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Fetch forum comments failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setNewPost = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_NEW_FORUM_POST,
      payload: { name, value },
    });
  };

  const resetNewPost = () => {
    dispatch({
      type: GlobalActionType.RESET_NEW_FORUM_POST,
    });
  };

  const addForumPost = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    // Reset error messages sebelum mengirim request
    dispatch({
      type: GlobalActionType.RESET_NEW_FORUM_POST_ERROR_MESSAGE,
    });

    try {
      const response = await api.post(`/forum-post`, state.newForumPost);

      if (!response.data.errors) {
        dispatch({
          type: GlobalActionType.ADD_FORUM_POST,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_FORUM_POST,
        });

        handleOpenMessageModal();

        setTimeout(() => {
          handleCloseMessageModal();
          router.push("/forums");
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
            type: GlobalActionType.SET_NEW_FORUM_POST_ERROR_MESSAGE,
            payload: errors,
          });
        }

        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Add forum post failed",
        });
      }
    } catch (error: any) {
      console.error("Error adding forum post:", error);

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

        // Set error message
        dispatch({
          type: GlobalActionType.SET_NEW_FORUM_POST_ERROR_MESSAGE,
          payload: errors,
        });
      }

      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Add forum post failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  const setNewComment = (name: string, value: string | number) => {
    dispatch({
      type: GlobalActionType.SET_NEW_FORUM_COMMENT,
      payload: { name, value },
    });
  };

  const resetNewComment = () => {
    dispatch({
      type: GlobalActionType.RESET_NEW_FORUM_COMMENT,
    });
  };

  const addForumComment = async () => {
    dispatch({ type: GlobalActionType.SET_LOADING, payload: true });

    try {
      const response = await api.post(`/forum-comment`, state.newForumComment);

      if (response.data) {
        dispatch({
          type: GlobalActionType.ADD_FORUM_COMMENT,
        });

        dispatch({
          type: GlobalActionType.RESET_NEW_FORUM_COMMENT,
        });

        fetchForumPostComments(state.newForumComment.postId);
      } else {
        console.error("Invalid API response format:", response.data);
        dispatch({
          type: GlobalActionType.SET_ERROR,
          payload: "Add forum comment failed",
        });
      }
    } catch (error) {
      console.error("Error adding forum comment:", error);
      dispatch({
        type: GlobalActionType.SET_ERROR,
        payload: "Add forum comment failed",
      });
    } finally {
      dispatch({ type: GlobalActionType.SET_LOADING, payload: false });
    }
  };

  return (
    <ForumsContext.Provider
      value={{
        forumCategories: state.forumCategories,
        forumCategoryId: state.forumCategoryId,
        forumPosts: state.forumPosts,
        forumPost: state.forumPost,
        newForumPost: state.newForumPost,
        newForumPostErrorMessage: state.newForumPostErrorMessage,
        forumComments: state.forumComments,
        newForumComment: state.newForumComment,
        fetchForumCategories,
        setForumCategoryId,
        fetchForumPosts,
        fetchForumPostDetail,
        fetchForumPostComments,
        setNewPost,
        resetNewPost,
        addForumPost,
        setNewComment,
        resetNewComment,
        addForumComment,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </ForumsContext.Provider>
  );
}

export function useForums() {
  const context = useContext(ForumsContext);
  if (!context) {
    throw new Error("useForums must be used within a ForumsProvider");
  }
  return context;
}
