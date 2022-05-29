import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup ,FormBuilder, AbstractControl, NgForm, FormControl, Validators} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ActionSheetController, IonContent, IonSlides, NavController, ToastController } from '@ionic/angular';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseServiceService } from '../firebase-service.service';
@Component({
  selector: 'app-dossier-form',
  templateUrl: './dossier-form.page.html',
  styleUrls: ['./dossier-form.page.scss'],
})
export class DossierFormPage implements OnInit {

  medicalForm: FormGroup;

  userData: any;
  id  : any;
  public weight: any;
  dossierform : FormGroup;
  public taux_glycemie: any;
  public diab_type: any;
  constructor(
    public toastController: ToastController,
    private firebaseServiceService: FirebaseServiceService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public router: Router,
    public fireService: FirebaseServiceService,
    public formBuilder: FormBuilder,
  ) {
    
   }


  //  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  //  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  //  @ViewChild('billingFormRef', { static: false }) billingFormRef: NgForm;
  //  @ViewChild('shippingFormRef', { static: false }) shippingFormRef: NgForm;
  //  @ViewChild('paymentFormRef', { static: false }) paymentFormRef: NgForm;
 
  //  public order: any = {
  //    id: 1,
  //    items: [{
  //      id: 1,
  //      name: 'Denim T-Shirt',
  //      amount: 15.00,
  //    }, {
  //      id: 1,
  //      name: 'Denim Pants',
  //      amount: 5.00,
  //    }, {
  //      id: 1,
  //      name: 'Black T-Shirt',
  //      amount: 5.00,
  //    }],
  //    subtotal: 25.00,
  //    shippingFee: 5.00,
  //    total: 30.00, 
  //  };
 
  //  public billingForm: FormGroup;
  //  public paymentForm: FormGroup;
  //  public shippingForm: FormGroup;
 
  //  public imagePath: SafeResourceUrl;
 
  //  public times = [];
 
  //  public slidesOpts = {
  //    allowTouchMove: false,
  //    autoHeight: true,
  //  };
 
  //  public slides: string[];
  //  public currentSlide: string;
  //  public isBeginning: boolean = true;
  //  public isEnd: boolean = false;
 
  //  get poids(): AbstractControl {
  //    return this.billingForm.get('poids');
  //  }
 
  //  get sexe(): AbstractControl {
  //    return this.billingForm.get('sexe');
  //  }
  //  get taille(): AbstractControl {
  //    return this.billingForm.get('taille');
  //  }
 
  //  get billingEmail(): AbstractControl {
  //    return this.billingForm.get('email');
  //  }
 
  //  get billingAddress(): AbstractControl {
  //    return this.billingForm.get('address');
  //  }
 
  //  get billingCity(): AbstractControl {
  //    return this.billingForm.get('city');
  //  }
 
  //  get billingState(): AbstractControl {
  //    return this.billingForm.get('state');
  //  }
 
  //  get billingZip(): AbstractControl {
  //    return this.billingForm.get('zip');
  //  }
 
  //  get billingCountryCode(): AbstractControl {
  //    return this.billingForm.get('country_code');
  //  }
 
  //  get shippingAddress(): AbstractControl {
  //    return this.shippingForm.get('address');
  //  }
 
  //  get shippingPhone(): AbstractControl {
  //    return this.shippingForm.get('phone');
  //  }
 
  //  get shippingDeliveryTime(): AbstractControl {
  //    return this.shippingForm.get('delivery_time');
  //  }
 
  //  get paymentNumber(): AbstractControl {
  //    return this.paymentForm.get('number');
  //  }
 
  //  get paymentExpiration(): AbstractControl {
  //    return this.paymentForm.get('expiration');
  //  }
 
  //  get paymentCvv(): AbstractControl {
  //    return this.paymentForm.get('cvv');
  //  }
 

  // ionViewDidEnter() {
  //   this.ionSlides.updateAutoHeight();
  // }

  // buildSlides() {
  //   const slides = ['Personnelles', 'Shipping', 'Summary', 'Payment'];
  //   this.currentSlide = slides[0];
  //   this.slides = slides;
  // }

  // setupForm() {
  //   this.billingForm = new FormGroup({
  //     poids: new FormControl('', Validators.required),
  //     taille: new FormControl('', Validators.required),
  //     sexe: new FormControl('', Validators.required),

  //     email: new FormControl('johndoe@some.com', Validators.required),
  //     address: new FormControl('Main Street 123', Validators.required),
  //     city: new FormControl('Boca Raton', Validators.required),
  //     state: new FormControl('Florida', Validators.required),
  //     zip: new FormControl('34799', Validators.required),
  //     country_code: new FormControl('US', Validators.required),
  //   });

  //   this.shippingForm = new FormGroup({
  //     address: new FormControl('Main Street 123', Validators.required),
  //     phone: new FormControl('+1546372922', Validators.required),
  //     delivery_time: new FormControl(null, Validators.required),
  //     message: new FormControl(''),
  //   });

  //   this.paymentForm = new FormGroup({
  //     number: new FormControl('', Validators.required),
  //     expiration: new FormControl('', Validators.required),
  //     cvv: new FormControl('', Validators.required),
  //   });
  // }

  // async onSlidesChanged() {
  //   const index = await this.ionSlides.getActiveIndex();
  //   this.currentSlide = this.slides[index];
  //   this.isBeginning = await this.ionSlides.isBeginning();
  //   this.isEnd = await this.ionSlides.isEnd();
  // }

  // onSlidesDidChange() {
  //   this.ionContent.scrollToTop();
  // }

  // onBackButtonTouched() {
  //   this.ionSlides.slidePrev();
  //   this.ionContent.scrollToTop();
  // }

  // onNextButtonTouched() {
    
  //   if (this.currentSlide === 'Personnelles') {

  //     this.billingFormRef.onSubmit(undefined);

  //     if (this.billingForm.valid) {
  //       this.ionSlides.slideNext();
  //       this.ionContent.scrollToTop();
  //     }

  //   } else if (this.currentSlide === 'Shipping') {
      
  //     this.shippingFormRef.onSubmit(undefined);

  //     if (this.shippingForm.valid) {
  //       this.ionSlides.slideNext();
  //       this.ionContent.scrollToTop();
  //     }

  //   } else if (this.currentSlide === 'Payment') {

  //     this.paymentFormRef.onSubmit(undefined);

  //     if (this.paymentForm.valid) {
  //       this.navCtrl.navigateRoot('/thanks', {
  //         animated: true,
  //         animationDirection: 'forward',
  //       });
  //     }

  //   }  else {

  //     this.ionSlides.slideNext();
  //     this.ionContent.scrollToTop();
  //   }
  // }

  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader;
  //   reader.onerror = reject;
  //   reader.onload = () => resolve(reader.result);
  //   reader.readAsDataURL(blob);
  // });




  // originalOrder = (): number => {
  //   return 0;
  // }



  async testSave() {
     console.log(this.medicalForm);

     if(this.medicalForm.status ==="INVALID"){
      const toast = await this.toastController.create({
        message: "Vous n'avez pas repndu à toutes les questions", 
        duration: 5000,
      });
      toast.present();
     }
     else{
      this.fireService.addDossier(this.medicalForm.value);
 
      this.firebaseServiceService
      .create(this.medicalForm.value)
      .then(() => {
      
      })
      .catch((err) => {
        console.log(err);
      });
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });


     }
     
  
   }

  ngOnInit() {

    this.medicalForm = this.formBuilder.group({
      uid:JSON.parse(localStorage.getItem("user")).uid,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      alcoolique: ['', Validators.required],
      fumeur: ['', Validators.required],
      diabetique: ['', Validators.required],
      tensionnaire: ['', ],
      vision: [''],
      cardiovasculaire: [''],
      operation: [''],
      sportif: ['']
    });
    // this.setupForm();
    // this.buildSlides();
    // this.times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];

    
  }
Save() {
  this.fireService.addDossier(this.dossierform.value);
  this.router.navigateByUrl('/dashboard', { replaceUrl: true });
}
}
