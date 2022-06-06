import { Product, ProductKey } from "src/app/_interfaces/product.interface";

export interface ApiInterface {

  login: (token: string) => Promise<void>;
  
  readProductKeys: (language: string ) => Promise<ProductKey[]>;
  createProductKey: (productKey: ProductKey) => Promise<ProductKey>;
  updateProductKey: (productKey: ProductKey) => Promise<ProductKey>;
  deleteProductKey: (uuid: string) => Promise<void>;
  updateOrders: (productKeys: ProductKey[]) => Promise<void>;

  readProduct: (uuid:string) => Promise<Product>;
  createProduct: (product: Product) => Promise<Product>;
  updateProduct: (product: Product) => Promise<Product>;
  deleteProduct: (uuid: string) => Promise<void>;

  getImageUrl: (uuid: string) => Promise<string>;
  uploadImage: (dataUrl: string) => Promise<string>;
  deleteImage: (uuid: string) => Promise<void>;
}