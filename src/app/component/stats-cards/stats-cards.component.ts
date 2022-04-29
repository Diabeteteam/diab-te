import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/firebase-service.service';

const uid = JSON.parse(localStorage.getItem('user')).uid;

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
})
export class StatsCardsComponent implements OnInit {
  lastTaux: number;
  lastTest: any;

  total: number;
  constructor(
    public fireService: FirebaseServiceService,
    private firebaseServiceService: FirebaseServiceService
  ) {}

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
  ngOnInit() {
    this.lastGlycemie();
    this.totalTest();
  }
}
