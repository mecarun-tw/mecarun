import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ProductKey } from 'src/app/_interfaces/product.interface';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  productKeys: ProductKey[] = [];
  destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    combineLatest(
      environment.languages.map(language => {
        return this.productsService.getProductKeys(language.code).pipe(
          filter(productKeys => !!productKeys),
          map(productKeys => productKeys as ProductKey[])
        );
      })
    ).pipe(
      takeUntil(this.destroy$),
      map(productKeySets => ([] as ProductKey[]).concat(...productKeySets))
    ).subscribe(productKeys => {
      this.productKeys = productKeys;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  editProduct = (uuid: string): void => {
    this.router.navigate(['admin', 'product-editor', uuid]);
  }

  deleteProduct = (uuid: string): void => {
    this.productsService.deleteProduct(uuid);
  }

  createProduct = () => {
    this.router.navigate(['admin', 'product-editor']);
  }

}
