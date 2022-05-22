import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DossierFormPage } from './dossier-form.page';

const routes: Routes = [
  {
    path: '',
    component: DossierFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DossierFormPageRoutingModule {}
