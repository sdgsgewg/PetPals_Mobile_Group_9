import { IUser } from "../user/IUser";

export interface IForumComment {
  forumCommentId: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
  user: IUser;
}
