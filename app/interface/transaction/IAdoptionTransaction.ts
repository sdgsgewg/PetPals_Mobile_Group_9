import { IPet } from "../pet/IPet";
import { IUser } from "../user/IUser";

export enum AdoptionStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export interface IAdoptionTransaction {
  adoptionId: number;
  adopterId: number;
  ownerId: number;
  petId: number;
  transactionType: string;
  price: number;
  booking_date: string;
  status: AdoptionStatus;
  adopter: IUser;
  owner: IUser;
  pet: IPet;
}
