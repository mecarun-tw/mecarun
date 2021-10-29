import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
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

  bannerSrc$ = new BehaviorSubject<string>('assets/images/banners/banner_0.png');
  bannerSrcs = [
    'assets/images/banners/banner_0.png',
    'assets/images/banners/banner_1.png',
    'assets/images/banners/banner_2.png',
    'assets/images/banners/banner_3.png',
  ]

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

    timer(10000, 10000).pipe(
      takeUntil(this.destroy$),
      map(n => n % 4),
      map(n => this.bannerSrcs[n])
    ).subscribe(this.bannerSrc$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
