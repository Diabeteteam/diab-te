import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DossierFormPageRoutingModule } from './dossier-form-routing.module';

import { DossierFormPage } from './dossier-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DossierFormPageRoutingModule
  ],
  declarations: [DossierFormPage]
})
export class DossierFormPageModule {}
