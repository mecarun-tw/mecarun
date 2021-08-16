import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectUsComponent } from 'src/app/connect-us/connect-us.component';
import { ProductsComponent } from 'src/app/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'connect-us', component: ConnectUsComponent },
  { path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
