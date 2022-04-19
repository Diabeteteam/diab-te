import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGlycemiePageRoutingModule } from './form-glycemie-routing.module';

import { FormGlycemiePage } from './form-glycemie.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGlycemiePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormGlycemiePage]
})
export class FormGlycemiePageModule {}
