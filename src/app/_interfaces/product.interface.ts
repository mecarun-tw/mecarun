export interface ProductKey {
  uuid: string;
  name: string;
  price: number;
  shortDescription: string;
  thumbnailUrl: string;
}

export interface Product {
  uuid: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
}