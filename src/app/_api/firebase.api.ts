import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product, ProductKey } from "src/app/_interfaces/product.interface";
import { ApiInterface } from "./api.interface";

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  constructor (
    private firestore: AngularFirestore
  ) {}

  readProductKeys = (language: string) => {
    return this.firestore.collection<ProductKey>(
      'productKeys',
      document => document.where('language', '==', language)
    ).get().toPromise().then(query => query.docs.map(doc => doc.data()));
  };

  readProduct = (uuid: string, language: string) => {
    return this.firestore.collection<Product>(
      'products',
      document => document.where('uuid', '==', uuid).where('language', '==', language)
    ).get().toPromise().then(query => query.docs.map(doc => doc.data())[0]);
  };
}