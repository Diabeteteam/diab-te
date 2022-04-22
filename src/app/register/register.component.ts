import { Component, OnInit } from '@angular/core';

import { FirebaseServiceService } from '../firebase-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public email: any;
  public password: any;
  public name: any;
  constructor(public fireService: FirebaseServiceService) {}

  ngOnInit() {}

  signup() {
    this.fireService
      .signup({ name: this.name, email: this.email, password: this.password })
      .then(
        (res) => {
          if (res.user.uid) {
            const data = {
              email: this.email,
              name: this.name,
              uid: res.user.uid,
            };
            this.fireService.saveDetails(data);
          }
        },
        (err) => {
          alert(err.message);

          console.log(err);
        }
      );
  }
}
