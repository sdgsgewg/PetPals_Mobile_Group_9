import { IUser } from "../user/IUser";
import { ISpecies } from "./ISpecies";

export enum PetStatus {
  Available = "available",
  Adopted = "adopted",
}

export interface IPet {
  petId: number;
  name: string;
  slug: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  status: PetStatus;
  price: number;
  owner: IUser;
  species: ISpecies;
}
