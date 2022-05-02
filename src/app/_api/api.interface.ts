import { Product, ProductKey } from "src/app/_interfaces/product.interface";

export interface ApiInterface {
  
  readProductKeys: (language: string ) => Promise<ProductKey[]>;
  createProductKey: (productKey: ProductKey) => Promise<ProductKey>;
  updateProductKey: (productKey: ProductKey) => Promise<ProductKey>;

  readProduct: (uuid:string) => Promise<Product>;
  createProduct: (product: Product) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
}