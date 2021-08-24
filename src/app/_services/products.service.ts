import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from 'src/app/_api/mock.api';
import { ProductKey } from 'src/app/_interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productKeys$ = new BehaviorSubject<ProductKey[]|null>(null);

  constructor(
    private api: Api
  ) {
    this.productKeys$.subscribe(v => console.log(v))
  }

  readProductKeys = (): Observable<ProductKey[]|null> => {
    console.log('read service')
    if (this.productKeys$.getValue() === null) {
      this.api.readProductKeys().subscribe(this.productKeys$);
    }
    return this.productKeys$;

  }
}
