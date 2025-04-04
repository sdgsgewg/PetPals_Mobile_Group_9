import { IForumComment } from "@/app/interface/forum/IForumComment";
import { IForumPost } from "@/app/interface/forum/IForumPost";
import { GlobalAction, GlobalActionType } from "../GlobalActions";
import { IForumCategory } from "@/app/interface/forum/IForumCategory";
import { INewForumPost } from "@/app/interface/forum/INewForumPost";
import { INewForumComment } from "@/app/interface/forum/INewForumComment";

export interface ForumState {
  forumCategories: IForumCategory[];
  forumCategoryId: number;
  forumPosts: IForumPost[];
  forumPost: IForumPost;
  newForumPost: INewForumPost;
  forumComments: IForumComment[];
  newForumComment: INewForumComment;
  loading: boolean;
  error: string | null;
}

export const initialState: ForumState = {
  forumCategories: [],
  forumCategoryId: 0,
  forumPosts: [],
  forumPost: {} as IForumPost,
  newForumPost: {} as INewForumPost,
  forumComments: [],
  newForumComment: {} as INewForumComment,
  loading: false,
  error: null,
};

export function ForumsReducer(state: ForumState, action: GlobalAction) {
  switch (action.type) {
    case GlobalActionType.GET_FORUM_CATEGORIES:
      return { ...state, forumCategories: action.payload };
    case GlobalActionType.SET_FORUM_CATEGORY_ID:
      return { ...state, forumCategoryId: action.payload };
    case GlobalActionType.GET_FORUM_POSTS:
      return { ...state, forumPosts: action.payload };
    case GlobalActionType.GET_FORUM_POST_DETAIL:
      return { ...state, forumPost: action.payload };
    case GlobalActionType.GET_FORUM_COMMENTS:
      return { ...state, forumComments: action.payload };
    case GlobalActionType.SET_NEW_FORUM_POST:
      return {
        ...state,
        newForumPost: {
          ...state.newForumPost,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_NEW_FORUM_POST:
      return {
        ...state,
        newForumPost: {
          userId: 0,
          forumCategoryId: 0,
          title: "",
          content: "",
        },
      };
    case GlobalActionType.ADD_FORUM_POST:
      return { ...state };
    case GlobalActionType.SET_NEW_FORUM_COMMENT:
      return {
        ...state,
        newForumComment: {
          ...state.newForumComment,
          [action.payload.name]: action.payload.value,
        },
      };
    case GlobalActionType.RESET_NEW_FORUM_COMMENT:
      return {
        ...state,
        newForumComment: {
          postId: 0,
          userId: 0,
          comment: "",
        },
      };
    case GlobalActionType.ADD_FORUM_COMMENT:
      return { ...state };
    case GlobalActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case GlobalActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
