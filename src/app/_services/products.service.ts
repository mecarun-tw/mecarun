import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
// import { Api } from 'src/app/_api/firebase.api';
import { Api } from 'src/app/_api/mock.api';
import { Product, ProductKey, getProductUuid } from 'src/app/_interfaces/product.interface';
@Injectable({
  providedIn: 'any'
})
export class ProductsService {

  private productKeysets = new Map<string, BehaviorSubject<ProductKey[]|null>>()
  private products = new Map<string, BehaviorSubject<Product|null>>(); // key: uuid

  constructor(
    private api: Api
  ) { }

  getProductKeys = (language: string): BehaviorSubject<ProductKey[]|null> => {
    if (!this.productKeysets.has(language)) {
      this.initProductKeys(language);
    }
    return this.productKeysets.get(language) as BehaviorSubject<ProductKey[]|null>;
  }

  getProductByUuid = (uuid: string): BehaviorSubject<Product|null> => {
    if (!this.products.has(uuid)) { // init
      this.initProduct(uuid);
    }
    return this.products.get(uuid) as BehaviorSubject<Product|null>;
  }

  getProduct = (productId: string, language: string) => {
    const uuid = getProductUuid(productId, language);
    return this.getProductByUuid(uuid);
  }

  createProduct = (product: Product) => {
    return this.api.createProductKey(product).then(productKeyResponse => {
      product.uuid = productKeyResponse.uuid;
      product.productId = productKeyResponse.productId;
      const productKeys$ = this.getProductKeys(productKeyResponse.language) as BehaviorSubject<ProductKey[]>;
      productKeys$.next([...productKeys$.value, productKeyResponse]);
      return this.api.createProduct(product);
    }).then(productResponse => {
      this.initProduct(productResponse.uuid, productResponse);
    });
  }

  private initProductKeys = (language: string) => {
    const productKeys$ = new BehaviorSubject<ProductKey[]|null>(null);
    this.productKeysets.set(language, productKeys$);
    this.api.readProductKeys(language).then(productKeysResponse => {
      productKeys$.next(productKeysResponse);
    });
  }

  private initProduct = (uuid: string, product?: Product) => {
    const product$ = new BehaviorSubject<Product|null>(null);
    this.products.set(uuid, product$);
    if (product) {
      product$.next(product);
    } else {
      this.api.readProduct(uuid).then(response => {
        product$.next(response);
      });
    }
  }
}
