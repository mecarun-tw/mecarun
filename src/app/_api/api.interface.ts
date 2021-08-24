import { Observable } from "rxjs";
import { Product, ProductKey } from "src/app/_interfaces/product.interface";

export interface ApiInterface {
  
  readProductKeys: () => Observable<ProductKey[]>;

  readProduct: (uuid: string) => Observable<Product|undefined>;
}