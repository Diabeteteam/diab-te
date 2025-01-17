import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {}

  initializeApp() {
    console.log('init');
    this.platform.ready().then(() => {
      if (!localStorage.getItem('welcome')) {
        console.log('welcome');

        localStorage.setItem('welcome', 'true');
        this.router.navigateByUrl('/welcome');
      }
    });
  }
}
