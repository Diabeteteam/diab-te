import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriqueGlycemiePageRoutingModule } from './historique-glycemie-routing.module';

import { HistoriqueGlycemiePage } from './historique-glycemie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriqueGlycemiePageRoutingModule
  ],
  declarations: [HistoriqueGlycemiePage]
})
export class HistoriqueGlycemiePageModule {}
