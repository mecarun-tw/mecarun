import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Product, ProductKey } from '../_interfaces/product.interface';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productKeys$ = new BehaviorSubject<ProductKey[]|null>([]);
  isOdd$!: Observable<boolean>;
  destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.getProductKeys().pipe(takeUntil(this.destroy$)).subscribe(this.productKeys$);

    this.isOdd$ = this.productKeys$.pipe(
      filter(productKeys => !!productKeys),
      map(productKeys => productKeys as ProductKey[]),
      map(productKeys => productKeys.length % 2 === 1)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
