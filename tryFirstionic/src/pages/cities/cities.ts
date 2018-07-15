import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the CitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cities',
  templateUrl: 'cities.html',
})
export class CitiesPage {
CitiesList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    firebase.database().ref("/towns").on('value',response=>{
     
      this.CitiesList=this.DataToArray2(response);
  
   });
  
  
  }

  DataToArray2(AllData) {
    let returnArr = [];

    AllData.forEach(childData => {
        let item = childData.val();
        item.key = childData.key;
        returnArr.push(item);
    });

    return returnArr;
  }

  itemTapped(event,city){
    this.navCtrl.push("WorkersCitiesPage",{
      CityITem:city
    })
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad CitiesPage');
  }

}
