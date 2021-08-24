import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { Product, ProductKey } from "../_interfaces/product.interface";
import { ApiInterface } from "./api.interface";

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  private productKeys$ = new BehaviorSubject<ProductKey[]>([
    {
      uuid: 'PRODUCT_KEY_UUID_0',
      name: 'Product Name',
      price: 123,
      shortDescription: 'short description. short description. short description. short description. short description. ',
      thumbnailUrl: ''
    },{
      uuid: 'PRODUCT_KEY_UUID_1',
      name: 'Product Name',
      price: 123,
      shortDescription: 'short description. short description. short description. short description. short description. ',
      thumbnailUrl: ''
    },{
      uuid: 'PRODUCT_KEY_UUID_2',
      name: 'Product Name',
      price: 123,
      shortDescription: 'short description. short description. short description. short description. short description. ',
      thumbnailUrl: ''
    },{
      uuid: 'PRODUCT_KEY_UUID_3',
      name: 'Product Name',
      price: 123,
      shortDescription: 'short description. short description. short description. short description. short description. ',
      thumbnailUrl: ''
    },{
      uuid: 'PRODUCT_KEY_UUID_4',
      name: 'Product Name',
      price: 123,
      shortDescription: 'short description. short description. short description. short description. short description. ',
      thumbnailUrl: ''
    },
  ]);

  private products$ = new BehaviorSubject<Product[]>([
    
  ]);

  readProductKeys = () => {
    return this.productKeys$;
  }

  readProduct = (uuid: string) => {
    return this.products$.pipe(
      map(products => products.find(product => product.uuid === uuid))
    )
  }
} 