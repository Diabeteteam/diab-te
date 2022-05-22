import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseServiceService } from '../firebase-service.service';
@Component({
  selector: 'app-dossier-form',
  templateUrl: './dossier-form.page.html',
  styleUrls: ['./dossier-form.page.scss'],
})
export class DossierFormPage implements OnInit {
  userData: any;
  id  : any;
  public weight: any;
  dossierform : FormGroup;
  public taux_glycemie: any;
  public diab_type: any;
  constructor(
    public router: Router,
    public fireService: FirebaseServiceService,
    public formBuilder: FormBuilder,
  ) {
    
   }

  ngOnInit() {
    this.dossierform = this.formBuilder.group({
      uid: [''],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      taux_glycemie: [''],
      diab_type: [''],
      weight: [''],
    });
    this.uid();
  }
Save() {
  this.fireService.addDossier(this.dossierform.value);
  this.router.navigateByUrl('/dashboard', { replaceUrl: true });
}
uid() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    this.id = user.uid;
    this.id = this.id;
  });
  return this.id;
}
}
