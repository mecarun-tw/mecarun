import { BehaviorSubject, Observable } from "rxjs";
import { Product, ProductKey } from "src/app/_interfaces/product.interface";
import { LanguagePackage } from "../_interfaces/language-package.interface";

export interface ApiInterface {
  
  readProductKeys: () => Observable<LanguagePackage<ProductKey[]>|null>;

  readProduct: (uuid: string) => Observable<LanguagePackage<Product>|null>;
}