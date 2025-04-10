import IService from "../service/IService";
import IUser from "../user/IUser";

interface IServiceTransaction {
  transactionId: number;
  adopterId: number;
  providerId: number;
  serviceId: number;
  transactionType: string;
  bookingDate: string;
  price: number;
  status: string;
  adopter: IUser;
  provider: IUser;
  service: IService;
}

export default IServiceTransaction;
