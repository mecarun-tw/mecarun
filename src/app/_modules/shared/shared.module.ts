import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainToolbarComponent } from 'src/app/_elements/main-toolbar/main-toolbar.component';
import { AngularMaterialModule } from 'src/app/_modules/angular-material/angular-material.module';
import { NgxTranslateModule } from 'src/app/_modules/ngx-translate/ngx-translate.module';

@NgModule({
  declarations: [
    MainToolbarComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    NgxTranslateModule,
  ],
  exports: [
    MainToolbarComponent,
  ]
})
export class SharedModule { }
