import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertControllerComponent } from '../component/alert-controller/alert-controller.component';
import { FirebaseServiceService } from '../firebase-service.service';

import { Chart, registerables } from 'chart.js';

const uid = JSON.parse(localStorage.getItem('user')).uid;

// eslint-disable-next-line @typescript-eslint/naming-convention

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('barCanvas', { static: true }) barCanvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  userName: string;
  lastTest: any;
  lastTaux: number;
  total: number;
  constructor(
    public alertController: AlertController,
    public router: Router,
    public fireService: FirebaseServiceService,
    private firebaseServiceService: FirebaseServiceService
  ) {}

  ionViewDidEnter() {
    this.barChartMethod();
  }
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [
          {
            label: '# of Votes',
            data: [1200, 500, 600, 15, 20, 34],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 3,
          },
        ],
      },
    });
  }

  totalTest() {
    const data = this.firebaseServiceService.firestore
      .collection('glycemieTest', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
    data.subscribe((queriedItems) => {
      this.total = queriedItems.length;
    });
  }
  lastGlycemie() {
    const data = this.firebaseServiceService.firestore
      .collection('glycemieTest', (ref) =>
        ref.where('uid', '==', uid).orderBy('date', 'desc').limit(1)
      )
      .valueChanges();
    data.subscribe((queriedItems) => {
      this.lastTest = queriedItems;
      this.lastTaux = this.lastTest[0].taux_glycemie;
      console.log(this.lastTest[0].taux_glycemie);
    });
  }
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

  ngOnInit() {
    this.lastGlycemie();
    this.totalTest();
  }
}
