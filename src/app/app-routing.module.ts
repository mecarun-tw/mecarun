import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectUsComponent } from 'src/app/connect-us/connect-us.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductComponent } from 'src/app/product/product.component';
import { PointsOfSaleComponent } from './points-of-sale/points-of-sale.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'product/:uuid', component: ProductComponent },
  { path: 'product', redirectTo: 'products' },
  { path: 'connect-us', component: ConnectUsComponent },
  { path: 'points-of-sale', component: PointsOfSaleComponent },
  { path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
