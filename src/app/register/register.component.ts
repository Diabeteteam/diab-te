import { Component, OnInit } from '@angular/core';

import { FirebaseServiceService } from '../firebase-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public email:any;
  public password:any;
  public name:any;
  constructor(
    public fireService:FirebaseServiceService
  ) { }

  ngOnInit() {
  }

  signup(){ 
    this.fireService.signup({name:this.name,email:this.email,password:this.password}).then(res=>{
      if(res.user.uid){
        let data = {
          email:this.email,
          password:this.password,
          name:this.name,
          uid:res.user.uid
        }
        this.fireService.saveDetails(data).then(res=>{
         alert('Compte crée avec succès!');
        },err=>{
          console.log(err);
        })
      }
    },err=>{
      alert(err.message);

      console.log(err);
    })
  }

}
