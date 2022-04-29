import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService, Glycemie } from '../firebase-service.service';
import { LoadingController } from '@ionic/angular';

const uid = JSON.parse(localStorage.getItem('user')).uid;

@Component({
  selector: 'app-historique-glycemie',
  templateUrl: './historique-glycemie.page.html',
  styleUrls: ['./historique-glycemie.page.scss'],
})
export class HistoriqueGlycemiePage implements OnInit {
  tests: any;
  uid: string;
  message: string;
  constructor(
    private firebaseServiceService: FirebaseServiceService,
    public loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Patientez ...',
      duration: 10000,
    });
    await loading.present();

    console.log(uid);
    const data = this.firebaseServiceService.getTests(uid);

    data.subscribe(async (queriedItems) => {
      this.tests = queriedItems;
      await loading.dismiss();
    });
  }
}
