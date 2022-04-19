import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export class Glycemie {
  id?: string;
  uid: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  taux_glycemie: string;
  observation: string;
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  userData: any;
  glycemie: any;

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  loginWithEmail(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection('users').doc(data.uid).set(data);
  }
  getDetails(data) {
    return this.firestore.collection('users').doc(data).get();
  }
  create(glycemie: Glycemie) {
    return this.firestore.collection('glycemieTest').add(glycemie);
  }

  getTests(uid) {
    const data = this.firestore
      .collection('glycemieTest', (ref) => ref.where('uid', '==', uid))
      .valueChanges();
    return data;
  }

  get(uid) {
    // ;
    this.firestore
      .collection('glycemieTest', (ref) => ref.where('uid', '==', uid))
      .get()
      .subscribe(async (review) => {
        const data = review.docs.map((element) => {
          this.glycemie = element.data();

          this.glycemie.id = element.id;

          // eslint-disable-next-line space-before-function-paren
          this.glycemie.uid.get().then(function (doc) {
            this.glycemie.item.uid = doc.data();
          });
          return data;
        });
      });
    console.log('ok');
  }
}
