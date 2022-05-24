import { Component, OnInit } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
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
  public ingredientsList: ingredients[];
  public ingredientChoisiList : ingredients[];
  display: boolean
  poids=100;
  poidsPortion = 100;
	nombrePortions = 4;
  public valeurParQuantitePortion: any
  public totaux: any ;

  constructor(private http: HttpClient) {
    this.totaux = { poids : 0, proteines : 0, glucides : 0, lipides : 0, energie : 0 };

    console.log("totaux", this.totaux)
    this.searchField = new FormControl('');
    this.ingredientChoisiList=[];
    


    this.loadData()
  }
    loadData(){
    let data:Observable<any>;
    data = this.http.get("assets/data/data.json");
    data.subscribe(result => {
      console.log(result)
      this.ingredientsList = result;
      console.log(result)
    })

   }

 initiazileIngredients(){
   console.log("vide")
  this.ingredientsList= [];
}

ajouterIngredientChoisi(ingredient){
  console.log("choix", this.ingredientChoisiList)

 this.ingredientChoisiList.push(ingredient)
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
        this.totaux.energie += parseFloat(this.ingredientChoisiList[i].energie_ue.replace(/,/, '.'));;
      
    
    console.log("totaux:",this.totaux)
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

 const  myObs1= from(this.ingredientChoisiList)

 myObs1.subscribe((value)=> {
   console.log(value)
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
  ngOnInit() {
  }

}
