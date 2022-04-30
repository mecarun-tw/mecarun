import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';

import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';

import { ExternalLinkButtonComponent } from 'src/app/_elements/buttons/external-link-button/external-link-button.component';

import { PublicComponent } from './public.component';
import { ConnectUsComponent } from './connect-us/connect-us.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { PointsOfSaleComponent } from './points-of-sale/points-of-sale.component';


@NgModule({
  declarations: [
    ExternalLinkButtonComponent,
    PublicComponent,
    ConnectUsComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductComponent,
    PointsOfSaleComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    AngularMaterialModule,
    NgxTranslateModule,
  ]
})
export class PublicModule { }
