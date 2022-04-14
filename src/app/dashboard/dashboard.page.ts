import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  navigate: any;

  constructor() {}

  ngOnInit() {}
  sideMenu() {
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home',
      },
      {
        title: 'Chat',
        url: '/chat',
        icon: 'chatboxes',
      },
      {
        title: 'Contacts',
        url: '/contacts',
        icon: 'contacts',
      },
    ];
  }
}
