import IUser from "../user/IUser";
import IServiceCategory from "./IServiceCategory";

interface IService {
  serviceId: number;
  providerId: number;
  categoryId: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  address: string;
  city: string;
  provider: IUser;
  category: IServiceCategory;
}

export default IService;
