import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseServiceService } from 'src/app/firebase-service.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
})
export class AppMenuComponent implements OnInit {
  constructor(
    public alertController: AlertController,
    public router: Router,
    public fireService: FirebaseServiceService,
    private firebaseServiceService: FirebaseServiceService
  ) {}

  ngOnInit() {}

  async logOut() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Decconnexion!',
      message: 'Voulez-vous réellement vous <strong> déconnecter? </strong>!!!',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Oui',
          id: 'confirm-button',
          handler: () => {
            localStorage.removeItem('user');

            this.fireService.signoutUser();
            this.router.navigateByUrl('/login');

            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }
}
