import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../firebase-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData: any;
  public email: any;
  public password: any;

  constructor(
    public router: Router,
    public fireService: FirebaseServiceService
  ) {}

  ngOnInit() {}

  login() {
    this.fireService.loginWithEmail(this.email, this.password).then(
      (res) => {
        console.log(res);
        if (res.user.uid) {
          this.userData = res.user;

          if (localStorage.getItem('welcome')) {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/welcome');
          }
        }
      },
      (err) => {
        alert(err.message);
        console.log(err);
      }
    );
  }
}
