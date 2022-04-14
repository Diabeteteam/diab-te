import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseServiceService {
  userData: any;

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
}
