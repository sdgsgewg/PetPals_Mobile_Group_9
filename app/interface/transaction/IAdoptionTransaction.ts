import IPet from "../pet/IPet";
import IUser from "../user/IUser";

export enum AdoptionStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

interface IAdoptionTransaction {
  transactionId: number;
  adopterId: number;
  ownerId: number;
  petId: number;
  transactionType: string;
  price: number;
  bookingDate: string;
  status: AdoptionStatus;
  adopter: IUser;
  owner: IUser;
  pet: IPet;
}

export default IAdoptionTransaction;
