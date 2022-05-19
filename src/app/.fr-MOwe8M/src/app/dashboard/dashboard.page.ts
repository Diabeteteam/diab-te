/* eslint-disable @typescript-eslint/dot-notation */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertControllerComponent } from '../component/alert-controller/alert-controller.component';
import { FirebaseServiceService } from '../firebase-service.service';
import 'chartjs-adapter-moment';

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
  glycemiData: any;
  glycemieDay: any;

  userName: string;
  lastTest: any;
  lastTaux: number;
  total: number;
  arrayA: any;
  constructor(
    public alertController: AlertController,
    public router: Router,
    public fireService: FirebaseServiceService,
    private firebaseServiceService: FirebaseServiceService
  ) {}
  ngOnInit() {
    this.lastGlycemie();
    this.totalTest();
  }
  ionViewDidEnter() {
    this.weekGlycemie();
  }
 
  barChartMethod() {
    this.lineChart = new Chart(this.barCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.glycemieDay,
        datasets: [
          {
            label: 'Taux hebdomadaire',
            data: this.glycemiData,
            fill: true,
            
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,

            backgroundColor: 'rgba(75,192,192,0.4)',
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#000',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.8)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            spanGaps: false,
          },
        ],
      },
      options: {
        
        interaction: {
          intersect: false
        },
        plugins: {
          // 'legend' now within object 'plugins {}'
          legend: {
            labels: {
              color: 'rgba(0, 0, 0, 0.8)', // not 'fontColor:' anymore
              // fontSize: 18  // not 'fontSize:' anymore
              font: {
                size: 18, // 'size' now within object 'font {}'
              },
            },
          },
        },
        scales: {
          y: {
            position: 'left',
            ticks: {
              color: 'rgba(0, 0, 0, 0.8)',
            },
          },
          x: {
            type: 'time',

            time: {
              unit: 'day',
            },
            ticks: {
              color: 'rgba(0, 0, 0, 0.8)',
            },
          },
        },
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
    });
  }

  weekGlycemie() {
    const data = this.firebaseServiceService.firestore
      .collection('glycemieTest', (ref) =>
        ref.where('uid', '==', uid).orderBy('date', 'desc').limit(21)
      )
      .valueChanges();
    data.subscribe((queriedItems) => {
      // eslint-disable-next-line arrow-body-style
      this.glycemiData = Object.keys(queriedItems).map((test) => {
        return {
          x: queriedItems[test]['date'].toDate(),
          y: queriedItems[test]['taux_glycemie'],
        };
      });
      // // eslint-disable-next-line @typescript-eslint/dot-notation
      // this.glycemiData = queriedItems.map((doc) => doc['taux_glycemie']);

      // // eslint-disable-next-line @typescript-eslint/dot-notation
      // this.glycemieDay = queriedItems.map((doc) => doc['date']);

      this.barChartMethod();
    });
  }
}
