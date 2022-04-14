import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConseilJourPage } from './conseil-jour.page';

const routes: Routes = [
  {
    path: '',
    component: ConseilJourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConseilJourPageRoutingModule {}
