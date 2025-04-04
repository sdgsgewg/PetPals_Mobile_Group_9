import { IUser } from "../user/IUser";

export interface IForumPost {
  forumPostId: number;
  forumCategoryId: number;
  userId: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  user: IUser;
}
