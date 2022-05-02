import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductEditorComponent } from './product-management/product-editor/product-editor.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'product-management', component: ProductManagementComponent },
    { path: 'product-editor/:uuid', component: ProductEditorComponent },
    { path: 'product-editor', component: ProductEditorComponent },
    { path: '**', redirectTo: 'product-management'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
