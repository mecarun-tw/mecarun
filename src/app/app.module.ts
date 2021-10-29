import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';
import { FirebaseModule } from './_modules/firebase/firebase.module';

import { ConnectUsComponent } from './connect-us/connect-us.component';
import { ProductsComponent } from './products/products.component';
import { ExternalLinkButtonComponent } from './_elements/buttons/external-link-button/external-link-button.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { PointsOfSaleComponent } from './points-of-sale/points-of-sale.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectUsComponent,
    ProductsComponent,
    ExternalLinkButtonComponent,
    ProductCardComponent,
    ProductComponent,
    PointsOfSaleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxTranslateModule,
    FirebaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
