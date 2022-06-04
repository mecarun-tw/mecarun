import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteComponent } from 'src/app/_elements/dialogs/confirm-delete/confirm-delete.component';
import { ProductKey, getProductUuid } from 'src/app/_interfaces/product.interface';
import { ProductsService } from 'src/app/_services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  productKeys: ProductKey[] = [];
  languages = environment.languages;
  destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    combineLatest(
      environment.languages.map(language => {
        return this.productsService.getProductKeys(language.code).pipe(
          filter(productKeys => productKeys !== null),
          map(productKeys => productKeys !== undefined ? productKeys as ProductKey[] : [])
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

  deleteProduct = (uuid: string): void => {
    this.matDialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'ADMIN.PRODUCT_MANAGEMENT.CONFIRM_DELETE_DIALOG.TITLE',
        message: 'ADMIN.PRODUCT_MANAGEMENT.CONFIRM_DELETE_DIALOG.MESSAGE'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.productsService.deleteProduct(uuid);
      }
    });
  }

  modifyProduct = (mode: string, language: string, productId: string) => {
    switch (mode) {
      case 'create':
        this.router.navigate(['admin', 'product-editor'], {queryParams: {language}});
        break;
      case 'edit':
        const uuid = getProductUuid(productId, language);
        this.router.navigate(['admin', 'product-editor', uuid], {queryParams: {language, productId}});
        break;
    }
  }

}
