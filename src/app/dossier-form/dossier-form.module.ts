import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossierFormPageRoutingModule } from './dossier-form-routing.module';

import { DossierFormPage } from './dossier-form.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossierFormPageRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [DossierFormPage]
})
export class DossierFormPageModule {}
