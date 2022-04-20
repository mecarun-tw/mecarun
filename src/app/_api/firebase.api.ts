import { Injectable } from "@angular/core";
import { collection, collectionData, doc, Firestore, query, where, docData, getDoc, getDocs } from "@angular/fire/firestore";
import { first } from "rxjs/operators";
import { Product, ProductKey } from "../_interfaces/product.interface";
import { ApiInterface } from "./api.interface";

@Injectable({
  providedIn: 'root'
})
export class Api implements ApiInterface {

  constructor (
    private firestore: Firestore
  ) {}

  readProductKeys = (language: string) => {
    return collectionData(query(
      collection(this.firestore, 'productKeys'),
      where('language', '==', language)
    )).pipe(first()).toPromise() as Promise<ProductKey[]>;
  };

  readProduct = (uuid: string, language: string) => {
    return collectionData(query(
      collection(this.firestore, 'products'),
      where('uuid', '==', uuid),
      where('language', '==', language)
    )).pipe(first()).toPromise().then(documents => {
      return documents[0] as Product;
    });
  };
}