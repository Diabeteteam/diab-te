import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService, Glycemie } from '../firebase-service.service';
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
  constructor(private firebaseServiceService: FirebaseServiceService) {}

  ngOnInit() {
    console.log(uid);
    const data = this.firebaseServiceService.getTests(uid);

    data.subscribe((queriedItems) => {
      this.tests = queriedItems;
    });
  }
}
