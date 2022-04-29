import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    public fireService: FirebaseServiceService,
    public toastController: ToastController
  ) {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {}

  login() {
    this.fireService.loginWithEmail(this.email, this.password).then(
      (res) => {
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: err.message,
          duration: 5000,
        });
        toast.present();
      }
    );
    //   const loading = await this.loadingController.create();
    //   await loading.present();

    //   const user = this.fireService.loginWithEmail(this.email, this.password);
    //   await loading.dismiss();
    //   console.log(localStorage.getItem('user'));

    //   if (user != null) {
    //     this.loaderDismissing();
    //     console.log(user);
    //     this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    //   } else {
    //     this.showAlert('Connexion echouée', 'Please try again!');
    //   }
    // }
  }
}
