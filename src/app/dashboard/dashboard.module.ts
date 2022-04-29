import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { StatsCardsComponent } from '../component/stats-cards/stats-cards.component';
import { CardsComponent } from '../component/cards/cards.component';
import { AppMenuComponent } from '../component/app-menu/app-menu.component';
import { NotificationButtonComponent } from '../component/notification-button/notification-button.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DashboardPageRoutingModule],
  declarations: [
    DashboardPage,
    StatsCardsComponent,
    CardsComponent,
    AppMenuComponent,
    NotificationButtonComponent,
  ],
})
export class DashboardPageModule {}
