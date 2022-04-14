import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriqueGlycemiePage } from './historique-glycemie.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueGlycemiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueGlycemiePageRoutingModule {}
