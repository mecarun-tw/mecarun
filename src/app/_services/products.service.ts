import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchAll } from 'rxjs/operators';
import { Api } from 'src/app/_api/firebase.api';
// import { Api } from 'src/app/_api/mock.api';
import { Product, ProductKey } from 'src/app/_interfaces/product.interface';
@Injectable({
  providedIn: 'any'
})
export class ProductsService {

  private productKeysStorage: ProductKey[] = [];
  private productsStorage = new Map<string, Product>(); // key: uuid_language
  public productKeys$ = new BehaviorSubject<ProductKey[]|null>(null);
  public products = new Map<string, BehaviorSubject<Product|null>>(); // key: uuid

  constructor(
    private api: Api,
    private translateService: TranslateService
  ) { }

  getProductKeys = (forceUpdate?: boolean): BehaviorSubject<ProductKey[]|null> => {
    if (this.productKeys$.value === null) { // init
      this.translateService.onLangChange.pipe(
        map(e => e.lang),
        startWith(this.translateService.currentLang),
        distinctUntilChanged()
      ).pipe(
        map(currentLanguage => {
          const productKeys = this.productKeysStorage.filter(productKey => productKey.language === currentLanguage);
          if (productKeys.length > 0) { // in storage
            return of(productKeys);
          } else { // not in storage
            return from(this.api.readProductKeys(currentLanguage).then(response => {
              this.productKeysStorage = this.productKeysStorage.filter(productKey => productKey.language !== currentLanguage).concat(response);
              return response;
            }));
          }
        }),
        switchAll() // flattened
      ).subscribe(this.productKeys$);
    }
    if (forceUpdate) {
      const currentLanguage = this.translateService.currentLang;
      this.api.readProductKeys(currentLanguage).then(response => {
        this.productKeysStorage = this.productKeysStorage.filter(productKey => productKey.language !== currentLanguage).concat(response);
        this.productKeys$.next(response);
      });
    }
    return this.productKeys$;
  }

  getProduct = (uuid: string, forceUpdate?: boolean): BehaviorSubject<Product|null> => {
    if (!this.products.has(uuid)) { // init
      const product$ = new BehaviorSubject<Product|null>(null);
      this.products.set(uuid, product$);
      this.translateService.onLangChange.pipe(
        map(e => e.lang),
        startWith(this.translateService.currentLang),
        distinctUntilChanged()
      ).pipe(
        map(currentLanguage => {
          const productsStorageKey = this.generateProductsStorageKey(uuid, currentLanguage);
          if (this.productsStorage.has(productsStorageKey)) { //in storage
            return of(this.productsStorage.get(productsStorageKey) as Product);
          } else { // not in storage
            return from(this.api.readProduct(uuid, currentLanguage).then(response => {
              this.productsStorage.set(productsStorageKey, response);
              return response;
            }));
          }
        }),
        switchAll()
      ).subscribe(product$);
    }
    if (forceUpdate) {
      const currentLanguage = this.translateService.currentLang;
      this.api.readProduct(uuid, currentLanguage).then(response => {
        const productsStorageKey = this.generateProductsStorageKey(uuid, currentLanguage);
        this.productsStorage.delete(productsStorageKey);
        this.productsStorage.set(productsStorageKey, response);
        this.products.get(uuid)?.next(response);
      });
    }
    return this.products.get(uuid) as BehaviorSubject<Product|null>;
  }

  private generateProductsStorageKey = (uuid: string, language: string): string => {
    return [uuid, language].join('_');
  }
}
