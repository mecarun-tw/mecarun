import { ExternalLink } from "./external-link.interface";

export interface ProductKey {
  uuid: string;
  name: string;
  price: string;
  shortDescription: string;
  thumbnailUrl: string;
}

export interface Product {
  uuid: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  externalLinks: ExternalLink[];
}