import { Product, ProductKey } from "src/app/_interfaces/product.interface";

export interface ApiInterface {
  
  readProductKeys: (language: string) => Promise<ProductKey[]>;

  readProduct: (uuid: string, language: string) => Promise<Product>;
}