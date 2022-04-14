import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepasMomentPageRoutingModule } from './repas-moment-routing.module';

import { RepasMomentPage } from './repas-moment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepasMomentPageRoutingModule
  ],
  declarations: [RepasMomentPage]
})
export class RepasMomentPageModule {}
