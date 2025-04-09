import IUser from "../user/IUser";

interface IForumPost {
  forumPostId: number;
  forumCategoryId: number;
  userId: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  user: IUser;
}

export default IForumPost;
