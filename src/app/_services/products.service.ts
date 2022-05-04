import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
// import { Api } from 'src/app/_api/firebase.api';
import { Api } from 'src/app/_api/mock.api';
import { Product, ProductKey, getProductUuid } from 'src/app/_interfaces/product.interface';
@Injectable({
  providedIn: 'any'
})
export class ProductsService {

  private productKeysets = new Map<string, BehaviorSubject<ProductKey[]|null>>(); // key: language
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

  updateProduct = (product: Product) => {
    return this.api.updateProductKey(product).then(productKeyResponse => {
      const productKeys$ = this.getProductKeys(product.language) as BehaviorSubject<ProductKey[]>;
      const productKeys = productKeys$.value;
      const index = productKeys.findIndex(productKeysElement => productKeysElement.uuid === product.uuid);
      productKeys[index] = productKeyResponse;
      productKeys$.next(productKeys);
      return this.api.updateProduct(product);
    }).then(productResponse => {
      const product$ = this.products.get(product.uuid) as BehaviorSubject<Product>;
      product$.next(productResponse);
    });
  }

  deleteProduct = (uuid: string) => {
    return this.api.deleteProductKey(uuid).then(() => {
      return this.getProductByUuid(uuid).pipe(
        filter(_product => !!_product),
        map(_product => _product?.language as string),
        first()
      ).toPromise();
    }).then(language => {
      const productKeys$ = this.getProductKeys(language) as BehaviorSubject<ProductKey[]>;
      const productKeys = productKeys$.value;
      const index = productKeys.findIndex(productKeysElement => productKeysElement.uuid === uuid);
      productKeys.splice(index, 1);
      productKeys$.next(productKeys);
      return this.api.deleteProduct(uuid);
    }).then(() => {
      this.products.get(uuid)?.complete();
      this.products.delete(uuid);
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
