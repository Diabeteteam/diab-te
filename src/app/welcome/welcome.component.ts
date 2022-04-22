import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router) {
    if (localStorage.getItem('welcome') && !localStorage.getItem('user')) {
      this.router.navigateByUrl('/login');
    } else if (
      localStorage.getItem('user') &&
      localStorage.getItem('welcome')
    ) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {}

  goTo() {
    if (!localStorage.getItem('welcome')) {
      localStorage.setItem('welcome', 'true');
      this.router.navigateByUrl('/login');
    }
    if (localStorage.getItem('welcome') && localStorage.getItem('user')) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
