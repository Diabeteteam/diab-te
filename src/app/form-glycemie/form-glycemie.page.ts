import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from '../firebase-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-form-glycemie',
  templateUrl: './form-glycemie.page.html',
  styleUrls: ['./form-glycemie.page.scss'],
})
export class FormGlycemiePage implements OnInit {
  message: any;
  titre: any;
  glycemieForm: FormGroup;
  id: any;
  today: any;
  constructor(
    private firebaseServiceService: FirebaseServiceService,
    public formBuilder: FormBuilder,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.glycemieForm = this.formBuilder.group({
      uid: [''],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      taux_glycemie: [''],
      observation: [''],
      date: [''],
    });
    this.uid();
  }
  testSave() {
    console.log(this.glycemieForm);

    this.firebaseServiceService
      .create(this.glycemieForm.value)
      .then(() => {
        if (
          this.glycemieForm.controls.taux_glycemie.value > 0.7 &&
          this.glycemieForm.controls.taux_glycemie.value < 1
        ) {
          this.message = 'Votre glycemie est normal';
          this.titre = 'Bravoo!!!';
        } else if (
          this.glycemieForm.controls.taux_glycemie.value > 1 &&
          this.glycemieForm.controls.taux_glycemie.value < 1.25
        ) {
          this.titre = 'Suivez bien votre regime!!!';
          this.message = 'Vous faites une hyperglycemie modérée';
        } else if (this.glycemieForm.controls.taux_glycemie.value > 1.25) {
          this.titre = 'Faites attention!!!';
          this.message = 'Vous faites une hyperglycemie!!!';
        } else {
          this.titre = `Attention à l'hypoglycémie!!!`;
          this.message = 'Prenez immédiatement du sucre rapide!!!';
        }
        this.glycemieForm.reset();
        this.presentAlert();
        this.router.navigateByUrl('/dashboard', { replaceUrl: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  uid() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.id = user.uid;
      this.id = this.id;
    });
    this.today = new Date();
    return this.id;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: `${this.titre}`,
      message: `${this.message}`,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    //  this.router.navigate(['/dashboard']);
  }
}
