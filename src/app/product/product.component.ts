import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Product } from '../_interfaces/product.interface';
import { ProductsService } from '../_services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product$ = new BehaviorSubject<Product|null>(null);
  destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(paramMap => paramMap.get('uuid')),
      filter(uuid => !!uuid),
      map(uuid => uuid as string),
      takeUntil(this.destroy$)
    ).subscribe(uuid => {
      this.productsService.getProduct(uuid).pipe(takeUntil(this.destroy$)).subscribe(this.product$);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
