import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepasMomentPage } from './repas-moment.page';

const routes: Routes = [
  {
    path: '',
    component: RepasMomentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepasMomentPageRoutingModule {}
