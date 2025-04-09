import IRole from "./IRole";

interface IUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  role: IRole;
}

export default IUser;
