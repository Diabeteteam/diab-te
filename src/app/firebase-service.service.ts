import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(public firestore: AngularFirestore,
    public auth: AngularFireAuth) 
    {}
    loginWithEmail(email: string, password: string) {
      return this.auth.signInWithEmailAndPassword(email, password);
    }
  
    signup(data) {
      return this.auth.createUserWithEmailAndPassword(data.email, data.password);
    }
  
    saveDetails(data) {
      return this.firestore.collection("users").doc(data.uid).set(data);
    }
    getDetails(data) {
      return this.firestore.collection("users").doc(data).get();
    }
}
