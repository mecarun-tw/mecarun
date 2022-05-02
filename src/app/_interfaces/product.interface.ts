import { ExternalLink } from "./external-link.interface";
import { v5 as uuidv5 } from 'uuid';
import { environment } from 'src/environments/environment';

export interface ProductKey {
  uuid: string; // uuid = uuidv5()
  productId: string;
  language: string;
  name: string;
  price: string;
  shortDescription: string;
  thumbnailUrl: string;
}

export interface Product extends ProductKey {
  description: string;
  imageUrl: string;
  externalLinks: ExternalLink[];
}

export function getProductUuid(productId: string, language: string) {
  return uuidv5([productId, language].join('_'), environment.UUID_NAMESPACE);
}