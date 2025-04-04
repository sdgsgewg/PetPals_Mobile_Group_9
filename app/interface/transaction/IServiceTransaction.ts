import { IService } from "../service/IService";
import { IUser } from "../user/IUser";

export interface IServiceTransaction {
  transaction_id: number;
  adopter_id: number;
  provider_id: number;
  service_id: number;
  transactionType: string;
  booking_date: string;
  price: number;
  status: string;
  adopter: IUser;
  provider: IUser;
  service: IService;
}
