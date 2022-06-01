import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainToolbarComponent } from 'src/app/_elements/main-toolbar/main-toolbar.component';
import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';
import { ConfirmDeleteComponent } from '../../_elements/dialogs/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    MainToolbarComponent,
    ConfirmDeleteComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgxTranslateModule,
  ],
  exports: [
    MainToolbarComponent,
    ConfirmDeleteComponent,
  ]
})
export class SharedModule { }
