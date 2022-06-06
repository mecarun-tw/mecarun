import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { Api } from 'src/app/_api/mock.api';
import { Product, ProductKey, getProductUuid, productToProductKey } from 'src/app/_interfaces/product.interface';
@Injectable({
  providedIn: 'any'
})
export class ProductsService {

  private productKeysets = new Map<string, BehaviorSubject<ProductKey[]|null|undefined>>(); // key: language
  private products = new Map<string, BehaviorSubject<Product|null|undefined>>(); // key: uuid

  constructor(
    private api: Api
  ) { }

  getProductKeys = (language: string): BehaviorSubject<ProductKey[]|null|undefined> => {
    if (!this.productKeysets.has(language)) {
      const productKeys$ = new BehaviorSubject<ProductKey[]|null|undefined>(null);
      this.productKeysets.set(language, productKeys$);
      this.api.readProductKeys(language).then(productKeysResponse => {
        productKeys$.next(productKeysResponse);
      }).catch(reason => {
        if (reason === 'NOT_EXIST') {
          productKeys$.next(undefined);
        }
      });
    }
    return this.productKeysets.get(language) as BehaviorSubject<ProductKey[]|null|undefined>;
  }

  getProductByUuid = (uuid: string): BehaviorSubject<Product|null|undefined> => {
    if (!this.products.has(uuid)) { // init
      const product$ = new BehaviorSubject<Product|null|undefined>(null);
      this.products.set(uuid, product$);
      this.api.readProduct(uuid).then(response => {
        product$.next(response);
      }).catch(reason => {
        if (reason === 'NOT_EXIST') {
          product$.next(undefined);
        }
      });
    }
    return this.products.get(uuid) as BehaviorSubject<Product|null|undefined>;
  }

  getProduct = (productId: string, language: string): BehaviorSubject<Product|null|undefined> => {
    const uuid = getProductUuid(productId, language);
    return this.getProductByUuid(uuid);
  }

  createProduct = (product: Product): Promise<void> => {
    const productKey = productToProductKey(product);
    return this.api.createProductKey(productKey).then(productKeyResponse => {
      product.uuid = productKeyResponse.uuid;
      product.productId = productKeyResponse.productId;
      const productKeys$ = this.getProductKeys(product.language);
      productKeys$.pipe(
        filter(productKeys => productKeys !== null),
        map(productKeys => productKeys as ProductKey[]),
        first()
      ).subscribe(productKeys => {
        productKeys$.next(productKeys ? [...productKeys, productKeyResponse] : [productKeyResponse])
      });
      return this.api.createProduct(product);
    }).then(productResponse => {
      const product$ = new BehaviorSubject<Product|null|undefined>(null);
      this.products.set(productResponse.uuid, product$);
      product$.next(product);
    });
  }

  updateProduct = (product: Product): Promise<void> => {
    return this.api.updateProductKey(product).then(productKeyResponse => {
      const productKeys$ = this.getProductKeys(product.language);
      productKeys$.pipe(
        filter(productKeys => productKeys !== null),
        map(productKeys => productKeys as ProductKey[]),
        first()
      ).subscribe(productKeys => {
        const index = productKeys.findIndex(productKeysElement => productKeysElement.uuid === product.uuid);
        productKeys[index] = productKeyResponse;
        productKeys$.next(productKeys);
      });
      return this.api.updateProduct(product);
    }).then(productResponse => {
      const product$ = this.products.get(product.uuid) as BehaviorSubject<Product>;
      product$.next(productResponse);
    });
  }

  deleteProduct = (uuid: string): Promise<void> => {

    return this.api.deleteProductKey(uuid).then(() => {
      return this.getProductByUuid(uuid).pipe(
        filter(_product => !!_product),
        map(_product => _product as Product),
        first()
      ).toPromise();
    }).then(_product => {
      // remove local productKey
      const productKeys$ = this.getProductKeys(_product.language);
      productKeys$.pipe(
        filter(productKeys => productKeys !== null),
        map(productKeys => productKeys as ProductKey[]),
        first()
      ).subscribe(productKeys => {
        const index = productKeys.findIndex(productKeysElement => productKeysElement.uuid === uuid);
        productKeys.splice(index, 1);
        productKeys$.next(productKeys);
      });
      // delete image
      return Promise.all([
        this.api.deleteImage(_product.thumbnailUuid),
        this.api.deleteImage(_product.productImageUuid),
      ]);
    }).then(() => {
      return this.api.deleteProduct(uuid);
    }).then(() => {
      this.products.get(uuid)?.complete();
      this.products.delete(uuid);
    });
  }
}
