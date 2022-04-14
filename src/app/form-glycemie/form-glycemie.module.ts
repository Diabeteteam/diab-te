import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGlycemiePageRoutingModule } from './form-glycemie-routing.module';

import { FormGlycemiePage } from './form-glycemie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGlycemiePageRoutingModule
  ],
  declarations: [FormGlycemiePage]
})
export class FormGlycemiePageModule {}
