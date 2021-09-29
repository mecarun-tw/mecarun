import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { Api } from 'src/app/_api/mock.api';
import { Product, ProductKey } from 'src/app/_interfaces/product.interface';
import { LanguagePackage } from 'src/app/_interfaces/language-package.interface';

interface ProductsStorage extends LanguagePackage<ProductKey[]> {
  productKeys$: BehaviorSubject<ProductKey[]|null>
}
interface ProductStorage extends LanguagePackage<Product> {
  product$: BehaviorSubject<Product|null>;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productKeys: ProductsStorage|null = null;
  private products = new Map<string, ProductStorage>();

  constructor(
    private api: Api,
    private translateService: TranslateService
  ) { }

  getProductKeys = (): Observable<ProductKey[]|null> => {
    if (this.productKeys !== null) {  // if it is already stored locally
      return this.productKeys.productKeys$;
    } else {
      const productKeysLanguagePackage$ = this.api.readProductKeys();
      const productKeys$ = new BehaviorSubject<ProductKey[]|null>(null);

      productKeysLanguagePackage$.subscribe(productKeysLanguagePackage => {
        this.productKeys = Object.assign({
          productKeys$
        }, productKeysLanguagePackage);
      });

      combineLatest([ // update if backend data or language change
        productKeysLanguagePackage$,
        this.translateService.onLangChange.pipe(map(e => e.lang), startWith(this.translateService.currentLang), distinctUntilChanged())
      ]).pipe(
        map(([productKeysLanguagePackage, language]) => {
          return productKeysLanguagePackage?.languages.get(language)
        }),
        map(productKeys => (productKeys ? productKeys : null) as ProductKey[]|null),
      ).subscribe(productKeys$);

      return productKeys$;
    }
  }

  getProduct = (uuid: string): BehaviorSubject<Product|null> => {
    if (this.products.has(uuid)) {  // if it is already stored locally
      return this.products.get(uuid)?.product$ as BehaviorSubject<Product|null>;
    } else {
      const productLanguagePackage$ = this.api.readProduct(uuid); // call backend
      const product$ = new BehaviorSubject<Product|null>(null);

      productLanguagePackage$.subscribe(productLanguagePackage => {
        this.products.set(
          uuid, {
            uuid: productLanguagePackage?.uuid,
            languages: productLanguagePackage?.languages,
            product$
          } as ProductStorage
        );
      });

      combineLatest([ // update if backend data or language change
        productLanguagePackage$,
        this.translateService.onLangChange.pipe(map(e => e.lang), startWith(this.translateService.currentLang), distinctUntilChanged())
      ]).pipe(
        map(([productLanguagePackage, language]) => {
          return productLanguagePackage?.languages.get(language)
        }),
        map(product => (product ? product : null) as Product|null),
      ).subscribe(product$);

      return product$;
    }
  }
}
