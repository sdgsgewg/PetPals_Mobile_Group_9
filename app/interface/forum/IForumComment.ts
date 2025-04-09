import IUser from "../user/IUser";

interface IForumComment {
  forumCommentId: number;
  postId: number;
  userId: number;
  comment: string;
  createdAt: string;
  user: IUser;
}

export default IForumComment;
