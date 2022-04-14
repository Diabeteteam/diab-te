import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConseilJourPageRoutingModule } from './conseil-jour-routing.module';

import { ConseilJourPage } from './conseil-jour.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConseilJourPageRoutingModule
  ],
  declarations: [ConseilJourPage]
})
export class ConseilJourPageModule {}
