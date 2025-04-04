import { IPet } from "../pet/IPet";
import { IService } from "../service/IService";
import { IUser } from "../user/IUser";

export interface ITransaction {
  transactionId: number;
  transactionType: string;
  bookingDate: string;
  price: number;
  user: IUser;
  itemType: string;
  item: IPet | IService;
}
