import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';
import { ConnectUsComponent } from './connect-us/connect-us.component';
import { ProductsComponent } from './products/products.component';
import { ExternalLinkButtonComponent } from './_elements/buttons/external-link-button/external-link-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectUsComponent,
    ProductsComponent,
    ExternalLinkButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    NgxTranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
