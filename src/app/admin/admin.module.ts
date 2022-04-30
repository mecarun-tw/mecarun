import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    NgxTranslateModule,
  ]
})
export class AdminModule { }
