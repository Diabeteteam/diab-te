import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  PreloadAllModules,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { CanActivate } from '@angular/router';
import AlwaysAuthGuard from './AlwaysAuthGuard';

const routes: Routes = [
  {
    path: 'welcome',
    canActivate: [AlwaysAuthGuard],

    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',

    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardPageModule),
  },
  {
    path: 'dossier-form',
    loadChildren: () =>
      import('./dossier-form/dossier-form.module').then(
        (m) => m.DossierFormPageModule
      ),
  },
  {
    path: 'repas-moment',
    loadChildren: () =>
      import('./repas-moment/repas-moment.module').then(
        (m) => m.RepasMomentPageModule
      ),
  },
  {
    path: 'conseil-jour',
    loadChildren: () =>
      import('./conseil-jour/conseil-jour.module').then(
        (m) => m.ConseilJourPageModule
      ),
  },
  {
    path: 'historique-glycemie',
    loadChildren: () =>
      import('./historique-glycemie/historique-glycemie.module').then(
        (m) => m.HistoriqueGlycemiePageModule
      ),
  },
  {
    path: 'form-glycemie',
    loadChildren: () =>
      import('./form-glycemie/form-glycemie.module').then(
        (m) => m.FormGlycemiePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [AlwaysAuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
