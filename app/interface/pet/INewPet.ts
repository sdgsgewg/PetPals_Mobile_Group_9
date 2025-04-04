export interface INewPet {
  petId?: number;
  name: string;
  breed: string;
  age: number;
  gender: string;
  speciesId: number;
  description: string;
  price: number;
  imageUrl?: string;
  ownerId: number;
}
