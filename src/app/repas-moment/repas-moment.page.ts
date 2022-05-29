import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { FirebaseServiceService, Repas } from '../firebase-service.service';
import { LoadingController } from '@ionic/angular';


interface ingredients {
  libelle:string, 
  proteines: string, 
  glucides: string,
  energie_ue  : string, 
  lipides: string, 
}

@Component({
  selector: 'app-repas-moment',
  templateUrl: './repas-moment.page.html',
  styleUrls: ['./repas-moment.page.scss'],
})

export class RepasMomentPage implements OnInit {
  public searchField: FormControl;
  public poidForm: FormControl;

  public ingredientsList: ingredients[];
  public ingredientChoisiList : any [];
  public ingredientL: ingredients[];

  public repas : Repas[];
  display: boolean
  poids=100;
  poidsPortion = 100;
	nombrePortions = 4;
  poids_predefini=100;

  public valeurParQuantitePortion: any
  public totaux: any ;

  constructor(private http: HttpClient,
    public loadingController: LoadingController,
    public fireService: FirebaseServiceService,
    ) {
    this.totaux = { poids : 0, proteines : 0, glucides : 0, lipides : 0, energie : 0 };

    this.searchField = new FormControl('');
    this.poidForm = new FormControl('');

    this.ingredientChoisiList=[];
    


    this.loadData()
  }


    loadData(){
    
    let data:Observable<any>;
    data = this.http.get("assets/data/data.json");
    data.subscribe(result => {
      
      this.ingredientsList = result;
    })

   }

 initiazileIngredients(){
   console.log("vide")
  this.ingredientsList= [];
}
ConvertString(value){
  console.log(value)
  return parseFloat(value.replace(/,/, '.'))
  }

retirerIngredient(a){
  console.log(a)
  var removed = _.remove(this.ingredientChoisiList, item => item.libelle === a.libelle);
  console.log("Choix update:", this.ingredientChoisiList)
      //Remise à zéro de tous les totaux

  this.totaux.poids = 0;
  this.totaux.proteines = 0;
  this.totaux.glucides = 0;
  this.totaux.lipides = 0;
  this.totaux.energie = 0;
 
   for (let i=0;i <this.ingredientChoisiList.length; i++ ){
     


       
    //Puis mise à jour des totaux
   
     this.totaux.poids += this.poids;
     
     this.totaux.proteines += parseFloat(this.ingredientChoisiList[i].proteines.replace(/,/, '.'));
     this.totaux.glucides += parseFloat(this.ingredientChoisiList[i].glucides.replace(/,/, '.'));
     this.totaux.lipides += parseFloat(this.ingredientChoisiList[i].lipides.replace(/,/, '.'));
     this.totaux.energie += parseFloat(this.ingredientChoisiList[i].energie_ue.replace(/,/, '.'));

 
     
     console.log("totaux:",this.totaux)
  
 
   }
}
ajouterIngredientChoisi(ingredient){
  console.log("choix", this.ingredientChoisiList)


  let ingredientL = {"proteines": ingredient.proteines, "lipides": ingredient.lipides, "glucides": ingredient.glucides, "energie":ingredient.energie_ue  }
  console.log("correct choix:", ingredientL)

 this.ingredientChoisiList.push({"proteines": ingredient.proteines, "lipides": ingredient.lipides, "glucides": ingredient.glucides, "energie":ingredient.energie_ue, "date": new Date(), "uid":JSON.parse(localStorage.getItem("user")).uid})
 this.display=false
 this.searchField = new FormControl('');
 console.log("choix", this.ingredientChoisiList)

 //Ici on fait le calcul de totaux à chaque fois que l'utilisateur clic sur un aliment
 // l'utilisation de .replace(/,/, '.') est pour remplacer  les , par des pont car ses données sont actuellemnt String
 this.totaux = { poids : 0, proteines : 0, glucides : 0, lipides : 0, energie : 0 };
 const  myObs= of(this.ingredientChoisiList)

 myObs.subscribe((value)=> {

  for (let i=0;i <this.ingredientChoisiList.length; i++ ){
  
    this.totaux.poids += this.poids;
    this.totaux.proteines += parseFloat(this.ingredientChoisiList[i].proteines.replace(/,/, '.'));
    this.totaux.glucides += parseFloat(this.ingredientChoisiList[i].glucides.replace(/,/, '.'));
    this.totaux.lipides += parseFloat(this.ingredientChoisiList[i].lipides.replace(/,/, '.'));
  //  this.totaux.energie += parseFloat(this.ingredientChoisiList[i].energie_ue.replace(/,/, '.'));


    console.log("totaux:",this.totaux, typeof(this.totaux.proteines))

   }
 })



 
//  this.ingredientChoisiList.map(ingredient=> {
//   console.log("totaux:",this.totaux.proteines)

//   this.totaux.poids += this.poids;
//       this.totaux.proteines += parseFloat(ingredient.proteines.replace(/,/g, '.'));
//       this.totaux.glucides += ingredient.glucides;
//       this.totaux.lipides += ingredient.lipides;
//       this.totaux.energie += ingredient.energie;
    
  
//   console.log("totaux:",this.totaux)
// });


}


getVal(event) {
console.log(event.target.value)
return this.poidsPortion * event.target.value / this.poids;


}
pourNombrePortions (valeur) {
  if ((this.nombrePortions === undefined) || (this.nombrePortions === null)) {
    return 0;
  }
  return valeur / this.nombrePortions;
}
pourPortionPoids(valeur){
  console.log("valeur:", valeur)
this.poidsPortion =valeur; 
console.log



 const  myObs1= from(this.ingredientChoisiList)

 myObs1.subscribe((value)=> {
   let  glucides = value.glucides
  if ((this.totaux.poids === 0) || (this.poidsPortion === undefined) || (this.poidsPortion === null)) {
    console.log("pas bine")
    return 0;
  }
  else 
    console.log("bine")

    return this.poidsPortion * valeur / this.totaux.poids;
  
  
 })
  
 
}

 

filterIngredients(ev: any) {
  this.loadData()
  let val = ev.target.value;
  console.log("ingredient:",this.ingredientsList)

  if (val && val.trim() != '') {

    this.ingredientsList = this.ingredientsList.filter((item) => {
      this.display= true;
      return (item.libelle.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
  else if (!val && val.trim()==''){
    this.display= false;
  }
}

async enregistrerRepas(){
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Envoie en cours...',
    duration: 2000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
  console.log(this.ingredientChoisiList)

  this.ingredientChoisiList.forEach((item)=>{
    this.fireService.ajoutRepas(item);
    console.log(item)
  })



}
  ngOnInit() {
    this.ingredientChoisiList,
    console.log(new Date())
   
  }

}
