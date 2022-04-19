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
  onSubmit() {
    if (!this.glycemieForm.valid) {
      return false;
    } else {
      this.firebaseServiceService
        .create(this.glycemieForm.value)
        .then(() => {
          this.glycemieForm.reset();
          //this.router.navigate(['/' ]);
          console.log('succes');
          this.presentAlert();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
      header: 'Merci!',
      message: 'Merci de votre collaboration',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.router.navigate(['/dashboard']);
  }
}
