import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchAll, takeUntil } from 'rxjs/operators';
import { ProductKey } from 'src/app/_interfaces/product.interface';
import { ProductsService } from 'src/app/_services/products.service';

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
    private productsService: ProductsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.onLangChange.pipe(
      map(e => e.lang),
      startWith(this.translateService.currentLang),
      distinctUntilChanged()
    ).pipe(
      takeUntil(this.destroy$),
      map(language => this.productsService.getProductKeys(language)),
      switchAll()
    ).subscribe(productKeys => this.productKeys$.next(productKeys));

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
    this.productKeys$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
