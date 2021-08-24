import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product, ProductKey } from '../_interfaces/product.interface';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productKeys$ = new BehaviorSubject<ProductKey[]|null>([]);
  destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.readProductKeys().pipe(takeUntil(this.destroy$)).subscribe(this.productKeys$);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
