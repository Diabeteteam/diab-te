import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepasMomentPageRoutingModule } from './repas-moment-routing.module';

import { RepasMomentPage } from './repas-moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepasMomentPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RepasMomentPage]
})
export class RepasMomentPageModule {}
