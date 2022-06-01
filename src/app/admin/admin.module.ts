import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { SharedModule } from 'src/app/_modules/shared/shared.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductEditorComponent } from './product-management/product-editor/product-editor.component';
import { LoginComponent } from 'src/app/_elements/dialogs/login/login.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductManagementComponent,
    ProductEditorComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularMaterialModule,
    NgxTranslateModule,
    SharedModule,
    QuillModule.forRoot()
  ]
})
export class AdminModule { }
