import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorityService } from 'src/app/_services/authority.service';
import { AdminComponent } from './admin.component';
import { ProductEditorComponent } from './product-management/product-editor/product-editor.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    { path: 'product-management', component: ProductManagementComponent, canActivate: [AuthorityService] },
    { path: 'product-editor/:uuid', component: ProductEditorComponent, canActivate: [AuthorityService] },
    { path: 'product-editor', component: ProductEditorComponent, canActivate: [AuthorityService] },
    { path: '**', redirectTo: 'product-management'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
