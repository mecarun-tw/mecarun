import { ExternalLink } from "./external-link.interface";
import { v5 as uuidv5 } from 'uuid';
import { environment } from 'src/environments/environment';

export interface ProductKey {
  uuid: string; // uuid = uuidv5()
  productId: string;
  language: string;
  order: number;
  name: string;
  price: string;
  shortDescription: string;
  thumbnailUuid: string;
}

export interface Product extends ProductKey {
  description: string;
  productImageUuid: string;
  externalLinks: ExternalLink[];
}

export function getProductUuid(productId: string, language: string): string {
  return uuidv5([productId, language].join('_'), environment.UUID_NAMESPACE);
}

export function productToProductKey (product: Product): ProductKey {
  return {
    uuid: product.uuid,
    productId: product.productId,
    language: product.language,
    name: product.name,
    price: product.price,
    shortDescription: product.shortDescription,
    thumbnailUuid: product.thumbnailUuid,
    order: product.order,
  } as ProductKey;
}