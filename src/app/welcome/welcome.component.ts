import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('welcome')) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  goTo() {
    if (!localStorage.getItem('welcome')) {
      console.log('welcome');

      localStorage.setItem('welcome', 'true');
      this.router.navigateByUrl('/dashboard');
    }
  }
}
