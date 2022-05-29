import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxNumberFormatModule } from 'ngx-number-format';

import { IonicModule } from '@ionic/angular';

import { RepasMomentPageRoutingModule } from './repas-moment-routing.module';

import { RepasMomentPage } from './repas-moment.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxNumberFormatModule,
    RepasMomentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RepasMomentPage]
})
export class RepasMomentPageModule {}
