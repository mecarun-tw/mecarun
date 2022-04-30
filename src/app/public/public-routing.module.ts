import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectUsComponent } from './connect-us/connect-us.component';
import { PointsOfSaleComponent } from './points-of-sale/points-of-sale.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { PublicComponent } from './public.component';

const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    { path: 'products', component: ProductsComponent },
    { path: 'product/:uuid', component: ProductComponent },
    { path: 'product', redirectTo: 'products' },
    { path: 'connect-us', component: ConnectUsComponent },
    { path: 'points-of-sale', component: PointsOfSaleComponent },
    { path: '**', redirectTo: 'products'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
