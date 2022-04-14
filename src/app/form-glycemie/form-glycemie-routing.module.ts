import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormGlycemiePage } from './form-glycemie.page';

const routes: Routes = [
  {
    path: '',
    component: FormGlycemiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormGlycemiePageRoutingModule {}
