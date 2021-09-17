import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LanguagePackage } from "../_interfaces/language-package.interface";
import { Product, ProductKey } from "../_interfaces/product.interface";
import { ApiInterface } from "./api.interface";

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  private productKeys$ = new BehaviorSubject<LanguagePackage<ProductKey[]>>({
    uuid: '',
    languages:new Map([
      [
        'zh',
        [
          {
            uuid: 'PRODUCT_KEY_UUID_0',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: ''
          },{
            uuid: 'PRODUCT_KEY_UUID_1',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: ''
          },{
            uuid: 'PRODUCT_KEY_UUID_2',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: ''
          }
        ]
      ], [
        'en',
        [
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
          }
        ]
      ]
    ])
  });

  private products$ = new BehaviorSubject<LanguagePackage<Product>[]>([
    {
      uuid: 'PRODUCT_KEY_UUID_0',
      languages: new Map([[
          'zh',{
            uuid: 'PRODUCT_KEY_UUID_0',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: '',
            description: '產品描述。產品描述。產品描述。產品描述。產品描述。',
            imageUrl: '',
          }
        ], [
          'en',{
            uuid: 'PRODUCT_KEY_UUID_0',
            name: 'Product Name',
            price: 123,
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: '',
            description: 'description. description. description. description. description.',
            imageUrl: '',
          }
        ]
      ])
    },{
      uuid: 'PRODUCT_KEY_UUID_1',
      languages: new Map([
        [
          'zh',{
            uuid: 'PRODUCT_KEY_UUID_1',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: '',
            description: '產品描述。產品描述。產品描述。產品描述。產品描述。',
            imageUrl: '',
          }
        ], [
          'en',{
            uuid: 'PRODUCT_KEY_UUID_1',
            name: 'Product Name',
            price: 123,
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: '',
            description: 'description. description. description. description. description.',
            imageUrl: '',
          }
        ]
      ])
    },{
      uuid: 'PRODUCT_KEY_UUID_2',
      languages: new Map([
        [
          'zh',{
            uuid: 'PRODUCT_KEY_UUID_2',
            name: '產品名稱',
            price: 123,
            shortDescription: '簡短描述。簡短描述。簡短描述。簡短描述。簡短描述。',
            thumbnailUrl: '',
            description: '產品描述。產品描述。產品描述。產品描述。產品描述。',
            imageUrl: '',
          }
        ], [
          'en',{
            uuid: 'PRODUCT_KEY_UUID_2',
            name: 'Product Name',
            price: 123,
            shortDescription: 'short description. short description. short description. short description. short description. ',
            thumbnailUrl: '',
            description: 'description. description. description. description. description.',
            imageUrl: '',
          }
        ]
      ])
    },
  ]);

  readProductKeys = () => {
    return this.productKeys$;
  }

  readProduct = (uuid: string): Observable<LanguagePackage<Product>|null> => {
    return this.products$.pipe(
      map(products => products.find(product => product.uuid === uuid)),
      map(product => product ? product : null)
    );
  }
} 