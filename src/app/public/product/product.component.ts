import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchAll, takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/_interfaces/product.interface';
import { ImagesService } from 'src/app/_services/images.service';
import { ProductsService } from 'src/app/_services/products.service';
import { getExternalLinkIconUrl } from 'src/app/_interfaces/external-link.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product$ = new BehaviorSubject<Product|null|undefined>(null);
  destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private translateService: TranslateService,
    private imagesService: ImagesService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    combineLatest([
      this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('productId')),
        map(productId => productId as string)
      ),
      this.translateService.onLangChange.pipe(
        map(e => e.lang),
        startWith(this.translateService.currentLang),
        distinctUntilChanged()
      )
    ]).pipe(
      takeUntil(this.destroy$),
      map(([productId, language]) => this.productsService.getProduct(productId, language)),
      switchAll(),
    ).subscribe(product => this.product$.next(product));
  }

  ngOnDestroy(): void {
    this.product$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  getImageUrl = (imageUuid: string) => {
    return this.imagesService.getImageUrl(imageUuid);
  }

  _getExternalLinkIconUrl = (site: string) => {
    return getExternalLinkIconUrl(site) as string;
  }
}
